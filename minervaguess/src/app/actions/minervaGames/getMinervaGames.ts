"use server";

import { MinervaGame } from "@/interfaces/minervaGameInterface";
import { db } from "@/lib/prisma";

export default async function getMinervaGames(
  quantity?: number
): Promise<MinervaGame[]> {
  quantity = quantity ? quantity : 10;

  const minervaGames = await db.minervaGame.findMany({
    orderBy: {
      date: "desc",
    },
    take: quantity,
  });

  return minervaGames;
}
