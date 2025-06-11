import { PrismaClient } from "@/generated/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const userWithPlantas = await prisma.usuario.findUnique({
    where: { email: session.user.email },
    select: {
      vasos: {
        select: {
          id: true,
          plantios: {
            select: {
              planta: {
                select: {
                  nomePopular: true,
                  nomeCientifico: true,
                },
              },
              dataInicio: true,
              dataFim: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(userWithPlantas);
}
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { planta } = await req.json();
  const prisma = new PrismaClient();

  try {
    if (!session?.user?.email || !planta) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const user = await prisma.usuario.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 408 });
    }

    const vasoUser = await prisma.vaso.findFirst({
      where: { idUser: user.id },
      select: { id: true },
    });

    if (!vasoUser) {
      return NextResponse.json({ error: "Usuário não tem vaso conectado" }, { status: 404 });
    }

    const plantio = await prisma.plantio.create({
      data: {
        idPlanta: Number(planta),
        idVaso: vasoUser.id,
        dataInicio: new Date(),
      },
    });

    return NextResponse.json(plantio, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar plantio:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
