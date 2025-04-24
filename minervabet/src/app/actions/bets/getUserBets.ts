"use server";

import { Bet } from "@/interfaces/betInterface";
import { db } from "@/lib/prisma";

export async function getUserBets(
  page: number,
  userId: string
): Promise<Bet[]> {
  const skip = 4 * page;
  const take = 4;

  const bets = await db.bet.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: skip,
    take: take,
    where: {
      userId: userId,
    },
  });

  return bets;
}

export async function getUserTotalBetsQt(userId: string) {
  const finalizatedBetsQt = await db.bet.count({
    where: {
      userId: userId,
    },
  });

  return finalizatedBetsQt;
}
