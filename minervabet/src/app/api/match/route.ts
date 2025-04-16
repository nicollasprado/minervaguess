import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const apiKey = process.env.RIOT_API_KEY;
  //const minervaPuuid = process.env.MINERVA_PUUID;
  const minervaPuuid =
    "ZcJT6JNINhZnP7ywspO2CKYwM1YS0bQfmkgrP2hwLIxjeI7-VeU9sjhmSDiMop-SVXtvEoxQsMEeFA";
  const apiUrl = `https://br1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${minervaPuuid}`;

  try {
    const response = await axios.get(apiUrl, { params: { api_key: apiKey } });
    const game = response.data;

    return new NextResponse(JSON.stringify(game), { status: 200 });
  } catch {
    console.error("Error when fetching game data");
    return new NextResponse("Partida não encontrada", { status: 404 });
  }
}
