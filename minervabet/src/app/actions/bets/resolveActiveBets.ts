"use server";

import { fetchLeagueFinishedMatch } from "../../../lib/riot/fetchLeagueMatch";
import { db } from "../../../lib/prisma";
import { FinishedGameParticipant } from "@/interfaces/gameDataInterface";
import { Bet, BetProperties } from "@/interfaces/betInterface";

const MINERVA_PUUID = process.env.NEXT_PUBLIC_MINERVA_PUUID;

export default async function resolveActiveBets() {
  const bets = await db.bet.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      status: "IN_PROGRESS",
    },
  });

  if (bets.length === 0) {
    return;
  }

  const gameId = bets[0].gameId;

  const match = await fetchLeagueFinishedMatch(gameId);

  if (!match) {
    console.error("match data not found while resolving active bets.");
    return;
  }

  const minervaData = match.info.participants.find(
    (participant) => participant.puuid === MINERVA_PUUID
  );

  if (!minervaData) {
    console.error("MinervaData not found while resolving active bets.");
    return;
  }

  await Promise.all(
    bets.map(async (tempBet) => {
      const user = await db.users.findUnique({
        where: {
          id: tempBet.userId,
        },
        select: {
          id: true,
          points: true,
        },
      });

      let newUserPoints = user!.points;
      const betResult = checkIfWinBet(tempBet, minervaData!);

      if (betResult) {
        newUserPoints += Math.ceil(
          tempBet.betPoints * tempBet.totalMultipliers
        );
      }

      if (newUserPoints <= 0) {
        newUserPoints = 100;
      }

      const receivedPoints = betResult
        ? tempBet.betPoints * tempBet.totalMultipliers
        : tempBet.betPoints;

      try {
        await db.bet.update({
          where: {
            id: tempBet.id,
          },
          data: {
            receivedPoints: receivedPoints,
            pastUserPoints: user!.points,
            newUserPoints: newUserPoints,
            result: betResult,
            status: "FINISHED",
          },
        });
      } catch (e) {
        console.error("Error updating bet: ", e);
      }

      try {
        await db.users.update({
          where: {
            id: tempBet.userId,
          },
          data: {
            points: newUserPoints,
          },
        });
      } catch (e) {
        console.error("Error updating user points: ", e);
      }

      try {
        await db.minervaGame.create({
          data: {
            gameId: gameId,
            assists: minervaData.assists,
            kills: minervaData.kills,
            deaths: minervaData.deaths,
            kda: minervaData.challenges.kda,
            championName: minervaData.championName,
            highestKillStreak: minervaData.largestMultiKill,
          },
        });
      } catch (e) {
        console.error("Error creating minerva game data: ", e);
      }
    })
  );
}

function checkIfWinBet(
  data: Bet,
  minervaData: FinishedGameParticipant
): boolean {
  const kills = minervaData.kills;
  const assists = minervaData.assists;
  const deaths = minervaData.deaths;

  if (data.killBet === "HIGH" && kills <= BetProperties.kills.average) {
    return false;
  } else if (data.killBet === "LOW" && kills >= BetProperties.kills.average) {
    return false;
  } else if (
    data.killBet !== "NOT" &&
    data.killBet !== "HIGH" &&
    data.killBet !== "LOW" &&
    Number(data.killBet) !== kills
  ) {
    return false;
  }

  if (data.assistBet === "HIGH" && assists <= BetProperties.assists.average) {
    return false;
  } else if (
    data.assistBet === "LOW" &&
    assists >= BetProperties.assists.average
  ) {
    return false;
  } else if (
    data.assistBet !== "NOT" &&
    data.assistBet !== "HIGH" &&
    data.assistBet !== "LOW" &&
    Number(data.assistBet) !== assists
  ) {
    return false;
  }

  if (data.deathBet === "HIGH" && deaths <= BetProperties.deaths.average) {
    return false;
  } else if (
    data.deathBet === "LOW" &&
    deaths >= BetProperties.deaths.average
  ) {
    return false;
  } else if (
    data.deathBet !== "NOT" &&
    data.deathBet !== "HIGH" &&
    data.deathBet !== "LOW" &&
    Number(data.deathBet) !== deaths
  ) {
    return false;
  }

  if (data.resultBet === "WIN" && !minervaData.win) {
    return false;
  } else if (data.resultBet === "LOSE" && minervaData.win) {
    return false;
  }

  return true;
}
