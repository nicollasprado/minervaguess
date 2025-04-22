// app/api/points-rank/route.ts
import { NextResponse } from "next/server";
import getUsersPointRank from "@/utils/getUsersPointRank";

export async function GET() {
  const rank = await getUsersPointRank();

  const parsedRankUsers = rank.map((user) => ({
    ...user,
    points: user.points.toString(),
    bets: user.bets.map((bet) => ({
      ...bet,
      points: bet.points.toString(),
    })),
  }));

  if (rank) {
    return new NextResponse(JSON.stringify(parsedRankUsers), { status: 200 });
  } else {
    console.error("Error when fetching users");
    return new NextResponse("Erro ao buscar usuarios", { status: 404 });
  }
}
