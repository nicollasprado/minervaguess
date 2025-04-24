import { User } from "@/interfaces/userInterface";
import { db } from "@/lib/prisma";

export default async function getUsersPointRank(
  quantity?: number
): Promise<User[]> {
  quantity = quantity ? quantity : 10;

  const rank = await db.users.findMany({
    orderBy: {
      points: "desc",
    },
    take: quantity,
    select: {
      id: true,
      username: true,
      email: true,
      points: true,
      bets: true,
      createdAt: true,
    },
  });

  return rank;
}
