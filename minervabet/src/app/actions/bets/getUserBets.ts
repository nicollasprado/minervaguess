"use server";

import { Bet } from "@/interfaces/betInterface";
import { db } from "@/lib/prisma";

export async function getUserBets(
  page: number,
  userId: string,
  qtCards: number
): Promise<Bet[]> {
  const skip = qtCards * page;
  const take = qtCards;

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
