"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterUser } from "@/services/registerUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
  username: z.string().min(1, { message: "O nome de usuário é obrigatório." }),
  email: z.string().min(1, { message: "O email é obrigatório." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [submitStatus, setSubmitStatus] = useState<[string, boolean]>([
    "",
    false,
  ]);

  const registerOnSubmit = async (data: RegisterFormSchema) => {
    const status = await RegisterUser(data);
    setSubmitStatus(() => {
      const success = status != "success";
      return [status, success];
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          action="POST"
          onSubmit={form.handleSubmit(registerOnSubmit)}
          className="flex flex-col gap-5 p-5"
        >
          {submitStatus[1] && submitStatus[0] === "username" ? (
            <div className="text-red-500">Nome de usuário já cadastrado!</div>
          ) : null}

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Nome de Usuário</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="text-white" />
                </FormControl>
              </FormItem>
            )}
          />

          {submitStatus[1] && submitStatus[0] === "email" ? (
            <div className="text-red-500">Email já cadastrado!</div>
          ) : null}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="text-white" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="text-white" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            variant={"outline"}
            className="cursor-pointer hover:ring-2 ring-gray-400"
          >
            REGISTRAR
          </Button>
        </form>
      </Form>
    </div>
  );
}
