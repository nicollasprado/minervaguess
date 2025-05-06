import { RegisterUserAction } from "@/app/actions/auth/registerUserAction";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new NextResponse("metodo invalido", { status: 405 });
  }

  try {
    const body = await req.json();
    const user = {
      username: body.username,
      email: body.email,
      password: body.password,
    };

    const registerStatus = await RegisterUserAction(user);

    const isError = registerStatus.status != "success";
    if (isError) {
      let fieldName = "";
      switch (registerStatus.field) {
        case "username":
          fieldName = "Nome de usuario";
          break;
        case "email":
          fieldName = "Email";
          break;
      }

      return new NextResponse("dados invalidos", {
        status: 400,
        statusText: `${fieldName}/${registerStatus.field}`,
      });
    }

    return new NextResponse("Usuario cadastrado com sucesso", {
      status: 200,
    });
  } catch {
    return new NextResponse("Erro ao realizar cadastro", { status: 500 });
  }
}
