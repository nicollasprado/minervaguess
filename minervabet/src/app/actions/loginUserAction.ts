"use server";

import { LoginFormSchema } from "@/app/components/login-form";
import { signIn } from "@/lib/authOptions";

export default async function loginUserAction(data: LoginFormSchema) {
  const username = data.username;
  const password = data.password;

  try {
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    return { success: true, message: "" };
  } catch (e) {
    if (!(e instanceof Error)) {
      return {
        success: false,
        message: "Um erro aconteceu, tente novamente mais tardeeee.",
      };
    }

    if ("type" in e && e.type === "CredentialsSignin") {
      return { success: false, message: "Credenciais inválidos." };
    }

    return {
      success: false,
      message: "Um erro aconteceu, tente novamente mais tarde.",
    };
  }
}
