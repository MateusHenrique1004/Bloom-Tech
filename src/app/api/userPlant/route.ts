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

  const user = await prisma.usuario.findUnique({
    where: { email: session.user?.email },
    select: { id: true },
  });

  const userWithVaso = await prisma.usuario.findUnique({
    where: { id: user?.id },
    select: {
      vasos: {
        select: {
          plantios: {
            where: { dataFim: null },
            select: {
              planta: {
                select: {
                  id: true,
                  nomePopular: true,
                  nomeCientifico: true,
                },
              },
            },
          },
        },
      },
    },
  });
  // console.log(userWithVaso);

  return NextResponse.json(userWithVaso);
}
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const formData = await req.formData();
  const plantas = formData.get("idPlanta");
  const jsonData = {
    idPlanta: Number(plantas),
  };
  const planta = jsonData.idPlanta;

  const prisma = new PrismaClient();

  try {
    if (!session?.user?.email || !planta) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const user = await prisma.usuario.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 408 }
      );
    }

    const vasoUser = await prisma.vaso.findFirst({
      where: { idUser: user.id },
      select: { id: true },
    });

    if (!vasoUser) {
      return NextResponse.json(
        { error: "Usuário não tem vaso conectado" },
        { status: 404 }
      );
    }

    const plantio = await prisma.plantio.create({
      data: {
        idPlanta: planta,
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
