"use server";

import { User } from "@/interfaces/userInterface";
import { db } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export default async function getUser(username: string): Promise<User | null> {
  const user = await db.users.findUnique({
    where: {
      username: username,
    },
    select: {
      id: true,
      username: true,
      email: true,
      points: true,
      bets: true,
      createdAt: true,
    },
  });

  return user;
}

type UserCredentials = {
  name: string;
  email: string;
};

export async function findUserByCredentials(
  username: string,
  password: string
): Promise<UserCredentials | null> {
  const user = await db.users.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    return null;
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (passwordMatch) {
    return { name: user.username, email: user.email };
  }

  return null;
}
