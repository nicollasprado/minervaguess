"use server";

import bcrypt from "bcryptjs";
import { db } from "./prisma";

type User = {
  name: string;
  email: string;
};

export async function findUserByCredentials(
  username: string,
  password: string
): Promise<User | null> {
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
