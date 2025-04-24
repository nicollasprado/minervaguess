import { GameData } from "@/interfaces/gameDataInterface";
import { fetchLeagueRunningMatch } from "./fetchLeagueMatch";
import { redis } from "../redis";
import resolveCurrentGameBets from "../../app/actions/bets/resolveCurrentGameBets";

export async function getCurrentMatch(): Promise<GameData | null> {
  try {
    const cachedStatus = await redis.get("current-match-status");
    if (cachedStatus) {
      return null;
    }

    const cachedData: GameData | null = await redis.get("current-match");
    if (cachedData) {
      return cachedData;
    }

    const data = await fetchLeagueRunningMatch();
    if (!data) {
      await redis.set("current-match-status", "ended", { ex: 60 });
      await resolveCurrentGameBets();
      return null;
    }

    await redis.set("current-match", JSON.stringify(data), { ex: 120 });
    return data;
  } catch (e) {
    console.error("Error while checking match cache: ", e);
    return null;
  }
}
