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
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: "O nome de usuário é obrigatório." })
    .max(20, { message: "O máximo de caracteres é 20" }),
  password: z
    .string()
    .min(1, { message: "A senha é obrigatória." })
    .max(20, { message: "O máximo de caracteres é 20" }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loginError, setLoginError] = useState<[string, boolean]>(["", false]);

  const loginOnSubmit = async (data: LoginFormSchema) => {
    try {
      await axios.post("/api/user/login", data);
      window.location.reload();
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        if (e.status !== 200) {
          setLoginError([e.response!.statusText, true]);
          return;
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form
        action="POST"
        onSubmit={form.handleSubmit(loginOnSubmit)}
        className="flex flex-col gap-5 p-5"
      >
        {loginError[1] ? <p className="text-red-500">{loginError[0]}</p> : null}

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
          CONECTAR
        </Button>
      </form>
    </Form>
  );
}
