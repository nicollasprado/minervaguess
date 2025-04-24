// app/api/points-rank/route.ts
import { NextResponse } from "next/server";
import getUsersPointRank from "@/app/actions/users/getUsersPointRank";

export async function GET() {
  const rank = await getUsersPointRank();

  if (rank) {
    return new NextResponse(JSON.stringify(rank), { status: 200 });
  } else {
    console.error("Error when fetching users");
    return new NextResponse("Erro ao buscar usuarios", { status: 404 });
  }
}
