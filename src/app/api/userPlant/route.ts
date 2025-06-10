import { PrismaClient } from "@/generated/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
