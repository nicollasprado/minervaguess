import { saveCurrentGameBet } from "@/app/actions/bets/createBetAction";
import { BetProperties } from "@/interfaces/betInterface";
import { getCurrentMatch } from "@/lib/riot/getCurrentMatch";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new NextResponse("metodo invalido", { status: 405 });
  }

  try {
    const body = await req.json();
    const { game, user, data } = body;

    const gameData = await getCurrentMatch();

    if (!gameData) {
      return new NextResponse("Erro ao criar aposta, partida nao encontrada", {
        status: 404,
      });
    }

    if (gameData.gameLength > BetProperties.secondsLimitToBet) {
      return new NextResponse(
        "Erro ao criar aposta, tempo limite para apostas excedido",
        { status: 403 }
      );
    }

    await saveCurrentGameBet(user, game, data);
    return new NextResponse("Aposta criada com sucesso", { status: 200 });
  } catch (e) {
    console.error("Erro ao salvar aposta:", e);
    return new NextResponse("erro ao criar aposta", { status: 500 });
  }
}
