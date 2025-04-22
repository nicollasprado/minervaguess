import getUser from "@/utils/getUser";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { username: string } }
) {
  const { username } = await context.params;
  const user = await getUser(username);

  if (user) {
    const parsedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      points: user.points.toString(),
      createdAt: user.createdAt,
    };

    return new NextResponse(JSON.stringify(parsedUser), { status: 200 });
  }

  return new NextResponse("Erro ao buscar usuario", { status: 404 });
}
