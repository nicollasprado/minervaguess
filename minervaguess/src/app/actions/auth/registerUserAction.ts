"use server";

import { RegisterFormSchema } from "@/app/components/register-form";
import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type RegisterStatus =
  | { status: "success" }
  | { status: "error"; field: keyof RegisterFormSchema };

export async function RegisterUserAction(
  data: RegisterFormSchema
): Promise<RegisterStatus> {
  if (!data.username || !data.email || !data.password) {
    throw new Error("Invalid data");
  }

  const usernameTest = await db.users.findUnique({
    where: {
      username: data.username,
    },
  });
  if (usernameTest) {
    return { status: "error", field: "username" };
  }

  const emailTest = await db.users.findUnique({
    where: {
      email: data.email,
    },
  });
  if (emailTest) {
    return { status: "error", field: "email" };
  }

  const newUser = await db.users.create({
    data: {
      username: data.username,
      email: data.email,
      password: bcrypt.hashSync(data.password),
      points: 100,
    },
  });

  if (newUser) {
    return { status: "success" };
  } else {
    throw new Error("Error saving new user in database.");
  }
}
