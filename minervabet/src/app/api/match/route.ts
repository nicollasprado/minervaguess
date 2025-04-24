import { getCurrentMatch } from "@/lib/riot/getCurrentMatch";
import { NextResponse } from "next/server";

export async function GET() {
  const gameData = await getCurrentMatch();

  if (!gameData) {
    return new NextResponse("Partida não encontrada", { status: 404 });
  }

  return new NextResponse(JSON.stringify(gameData), { status: 200 });
}
