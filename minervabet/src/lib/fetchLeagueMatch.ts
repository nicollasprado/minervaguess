import axios from "axios";

export async function fetchLeagueMatch() {
  const apiKey = process.env.RIOT_API_KEY;
  const minervaPuuid = process.env.NEXT_PUBLIC_MINERVA_PUUID;
  const apiUrl = `https://br1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${minervaPuuid}`;

  try {
    const response = await axios.get(apiUrl, { params: { api_key: apiKey } });
    const game = response.data;

    return game;
  } catch (error) {
    console.error("Erro ao buscar dados da partida:", error);
    return null;
  }
}
