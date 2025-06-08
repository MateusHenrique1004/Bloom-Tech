import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";

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
  const senhaCripto = await bcrypt.hash(senha, 10);

  const USER = await prisma.usuario.create({
    data: {
      nome,
      email,
      senha: senhaCripto,
      telefone,
    },
  });

  return NextResponse.json({ id: USER.id });
}

export async function PUT(request: Request) {
  const { nome, email, senha, telefone } = await request.json();
  const user = await prisma.usuario.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json(
      { message: "Usuário Não Encontrado" },
      { status: 400 }
    );
  }
  const senhaCripto = await bcrypt.hash(senha, 10);

  await prisma.usuario.update({
    where: { email },
    data: { nome, email, telefone, senha: senhaCripto },
  });
  return NextResponse.json(
    { message: "Usuário Atualizado com Sucesso" },
    { status: 201 }
  );
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const user = await prisma.usuario.findUnique({
    where: { email: session.user.email },
    select: { nome: true, email: true, telefone: true },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}
