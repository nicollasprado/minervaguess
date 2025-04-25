import loginUserAction from "@/app/actions/auth/loginUserAction";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new NextResponse("metodo invalido", { status: 405 });
  }

  try {
    const body = await req.json();
    const user = {
      username: body.username,
      password: body.password,
    };

    const response = await loginUserAction(user);

    if (response.success) {
      return new NextResponse("logado com sucesso", {
        status: 200,
      });
    }

    return new NextResponse("usuario nao encontrado", {
      status: 404,
      statusText: response.message,
    });
  } catch {
    return new NextResponse("Erro ao realizar login", { status: 500 });
  }
}
