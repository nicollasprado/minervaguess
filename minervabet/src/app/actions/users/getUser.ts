import { User } from "@/interfaces/userInterface";
import { db } from "@/lib/prisma";

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
