import { saveCurrentGameBet } from "@/app/actions/bets/createBetAction";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new NextResponse("metodo invalido", { status: 405 });
  }

  try {
    const body = await req.json();
    const { game, user, data } = body;

    await saveCurrentGameBet(user, game, data);
    return new NextResponse("Aposta criada com sucesso", { status: 200 });
  } catch (e) {
    console.error("Erro ao salvar aposta:", e);
    return new NextResponse("erro ao salvar aposta", { status: 500 });
  }
}
