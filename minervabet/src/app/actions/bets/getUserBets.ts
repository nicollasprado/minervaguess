"use server";

import { Bet, CurrentGameBet } from "@/interfaces/betInterface";
import { db } from "@/lib/prisma";

export async function getUserBets(
  page: number,
  userId: string
): Promise<[Bet[], CurrentGameBet[]]> {
  const skip = 4 * page;
  const take = 4;

  const currentGameBets = await db.currentGameBet.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: skip,
    take: take,
    where: {
      userId: userId,
    },
  });

  if (currentGameBets.length < take) {
    const newTake = take - currentGameBets.length;
    let newSkip = currentGameBets.length === 0 ? skip : skip - newTake;
    newSkip = newSkip < 0 ? 0 : newSkip;
    const finalizatedBets = await db.bet.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: newSkip,
      take: newTake,
      where: {
        userId: userId,
      },
    });

    return [finalizatedBets, currentGameBets];
  }

  return [[], currentGameBets];
}

export async function getUserTotalBetsQt(userId: string) {
  const finalizatedBetsQt = await db.bet.count({
    where: {
      userId: userId,
    },
  });

  const currentGameBetsQt = await db.currentGameBet.count({
    where: {
      userId: userId,
    },
  });

  return finalizatedBetsQt + currentGameBetsQt;
}
