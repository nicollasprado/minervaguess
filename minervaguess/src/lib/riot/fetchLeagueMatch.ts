import { FinishedGameData, GameData } from "@/interfaces/gameDataInterface";
import axios from "axios";

const apiKey = process.env.RIOT_API_KEY;
const minervaPuuid = process.env.NEXT_PUBLIC_MINERVA_PUUID;

export async function fetchLeagueRunningMatch() {
  const apiUrl = `https://br1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${minervaPuuid}`;

  try {
    const response = await axios.get<GameData>(apiUrl, {
      headers: {
        "X-Riot-Token": apiKey,
      },
    });
    const game = response.data;

    return game;
  } catch (error) {
    if (error instanceof Error && "status" in error) {
      if (error.status === 404) {
        console.log("Nenhuma partida em andamento encontrada na API da RIOT");
      }
    } else {
      console.error("Erro ao buscar dados da partida:", error);
    }

    return null;
  }
}

export async function fetchLeagueFinishedMatch(matchId: string) {
  const apiUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/BR1_${matchId}`;

  try {
    const response = await axios.get<FinishedGameData>(apiUrl, {
      headers: {
        "X-Riot-Token": apiKey,
      },
    });
    const game = response.data;

    return game;
  } catch (error) {
    if (error instanceof Error && "status" in error) {
      if (error.status === 404) {
        console.log("Nenhuma partida encontrada na API da RIOT");
      }
    } else {
      console.error("Erro ao buscar dados da partida:", error);
    }

    return null;
  }
}
