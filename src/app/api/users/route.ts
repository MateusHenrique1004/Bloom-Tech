import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { nome, email, senha, telefone } = await request.json();

  const user = await prisma.usuario.findUnique({
    where: { email },
  });

  if (user) {
    return NextResponse.json(
      { message: "Usuário Já existente" },
      { status: 400 }
    );
  }

  await prisma.usuario.create({
    data: {
      nome,
      email,
      senha,
      telefone,
    },
  });

  return NextResponse.json(
    { message: "Usuário Criado com Sucesso" },
    { status: 201 }
  );
}
