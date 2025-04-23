"use server";

import { GameData } from "@/interfaces/gameDataInterface";
import { User } from "@/interfaces/userInterface";
import { db } from "@/lib/prisma";

export interface BetData {
  assistHigh: boolean;
  assistLow: boolean;
  assistSpecific: string;
  deathHigh: boolean;
  deathLow: boolean;
  deathSpecific: string;
  killHigh: boolean;
  killLow: boolean;
  killSpecific: string;
  lose: boolean;
  win: boolean;
  points: number;
  totalMultipliers: number;
}

export async function saveCurrentGameBet(
  user: User,
  game: GameData,
  betData: BetData
) {
  let assistBet = "NOT";
  if (betData.assistLow) {
    assistBet = "LOW";
  } else if (betData.assistHigh) {
    assistBet = "HIGH";
  } else if (betData.assistSpecific !== "") {
    assistBet = betData.assistSpecific;
  }

  let deathBet = "NOT";
  if (betData.deathLow) {
    deathBet = "LOW";
  } else if (betData.deathHigh) {
    deathBet = "HIGH";
  } else if (betData.deathSpecific !== "") {
    deathBet = betData.deathSpecific;
  }

  let killBet = "NOT";
  if (betData.killLow) {
    killBet = "LOW";
  } else if (betData.killHigh) {
    killBet = "HIGH";
  } else if (betData.killSpecific !== "") {
    killBet = betData.killSpecific;
  }

  let resultBet = "NOT";
  if (betData.win) {
    resultBet = "WIN";
  } else if (betData.lose) {
    resultBet = "LOSE";
  }

  const dbUser = await db.users.findUnique({
    where: {
      id: user.id,
    },
  });

  const newPoints = dbUser!.points - BigInt(betData.points);
  if (newPoints < 0) {
    throw new Error(
      "Error, user dont have required points to create this bet."
    );
  }

  await db.users.update({
    where: {
      id: user.id,
    },
    data: {
      points: newPoints,
    },
  });

  await db.currentGameBet.create({
    data: {
      points: BigInt(betData.points),
      assistBet: assistBet,
      deathBet: deathBet,
      killBet: killBet,
      resultBet: resultBet,
      totalMultipliers: betData.totalMultipliers,
      userId: user.id,
      gameId: game.gameId.toString(),
    },
  });
}
