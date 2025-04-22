import { GameData } from "@/interfaces/gameDataInterface";
import { fetchLeagueMatch } from "./fetchLeagueMatch";
import { redis } from "./redis";

export async function getCurrentMatch(): Promise<GameData | null> {
  try {
    const cachedStatus = await redis.get("current-match-status");
    if (cachedStatus) {
      return null;
    }

    const rawCachedData = await redis.get("current-match");
    if (rawCachedData) {
      return JSON.parse(rawCachedData as string);
    }

    const data = await fetchLeagueMatch();
    if (!data) {
      await redis.set("current-match-status", "ended", { ex: 120 });
      return null;
    }

    await redis.set("current-match", JSON.stringify(data), { ex: 120 });
    return data;
  } catch (e) {
    console.error("Error while checking match cache: ", e);
    return null;
  }
}
