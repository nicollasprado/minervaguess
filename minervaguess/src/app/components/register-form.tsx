"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";

const registerFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: "O nome de usuário é obrigatório." })
    .max(20, { message: "O máximo de caracteres é 20" }),
  email: z
    .string()
    .min(1, { message: "O email é obrigatório." })
    .max(20, { message: "O máximo de caracteres é 20" }),
  password: z
    .string()
    .min(1, { message: "A senha é obrigatória." })
    .max(20, { message: "O máximo de caracteres é 20" }),
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

  const registerOnSubmit = async (data: RegisterFormSchema) => {
    try {
      await axios.post("/api/user/register", data);

      await axios.post("/api/user/login", {
        username: data.username,
        password: data.password,
      });

      window.location.reload();
    } catch (e) {
      if (e instanceof AxiosError) {
        const [fieldText, field] = e.response!.statusText.split("/");
        if (e.status !== 200) {
          form.setError(field as keyof RegisterFormSchema, {
            type: "manual",
            message: `${fieldText} já cadastrado.`,
          });
          return;
        }
      }
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          action="POST"
          onSubmit={form.handleSubmit(registerOnSubmit)}
          className="flex flex-col gap-5 p-5"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Nome de Usuário</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="text-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="text-white" />
                </FormControl>
                <FormMessage />
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
                <FormMessage />
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
