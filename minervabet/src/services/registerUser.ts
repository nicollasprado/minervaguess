"use server";

import { RegisterFormSchema } from "@/app/components/register-form";
import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function RegisterUser(data: RegisterFormSchema) {
  if (!data.username || !data.email || !data.password) {
    return "all";
  }

  const usernameTest = await db.users.findUnique({
    where: {
      username: data.username,
    },
  });
  if (usernameTest) {
    return "username";
  }

  const emailTest = await db.users.findUnique({
    where: {
      email: data.email,
    },
  });
  if (emailTest) {
    return "email";
  }

  const newUser = await db.users.create({
    data: {
      username: data.username,
      email: data.email,
      password: bcrypt.hashSync(data.password),
      points: 0,
    },
  });

  if (newUser) {
    return "success";
  }

  return "";
}
