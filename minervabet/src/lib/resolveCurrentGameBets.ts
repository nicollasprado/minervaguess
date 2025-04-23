import { fetchLeagueFinishedMatch } from "./fetchLeagueMatch";
import { db } from "./prisma";
import { FinishedGameParticipant } from "@/interfaces/gameDataInterface";
import { BetProperties } from "@/interfaces/betInterface";
import { CurrentGameBet } from "@prisma/client";

const MINERVA_PUUID = process.env.NEXT_PUBLIC_MINERVA_PUUID;

export default async function resolveCurrentGameBets() {
  const bets = await db.currentGameBet.findMany();

  if (!bets) {
    return;
  }

  const match = await fetchLeagueFinishedMatch(bets[0].gameId);
  const minervaData = match!.info.participants.find(
    (participant) => participant.puuid === MINERVA_PUUID
  );

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
        newUserPoints += tempBet.points * tempBet.totalMultipliers;
      }

      if (newUserPoints <= 0) {
        newUserPoints = 100;
      }

      let error = false;
      try {
        await db.bet.create({
          data: {
            points: newUserPoints,
            killBet: tempBet.killBet,
            assistBet: tempBet.assistBet,
            deathBet: tempBet.deathBet,
            resultBet: tempBet.resultBet,
            result: betResult,
            totalMultipliers: tempBet.totalMultipliers,
            userId: user!.id,
            gameId: tempBet.gameId,
          },
        });
      } catch (e) {
        console.error("Error creating definitive bet: ", e);
        error = true;
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
        error = true;
      }

      if (!error) {
        await db.currentGameBet.delete({
          where: {
            id: tempBet.id,
          },
        });
      }
    })
  );
}

function checkIfWinBet(
  data: CurrentGameBet,
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
    data.killBet !== "LOW"
  ) {
    return Number(data.killBet) === kills;
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
    data.assistBet !== "LOW"
  ) {
    return Number(data.assistBet) === assists;
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
    data.deathBet !== "LOW"
  ) {
    return Number(data.deathBet) === deaths;
  }

  return true;
}
