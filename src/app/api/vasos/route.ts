import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { userId, numeroSerie } = await request.json();

  console.log("userId", userId);
  console.log("numeroSerie", numeroSerie);

  if (!userId || numeroSerie === undefined) {
    return NextResponse.json(
      { error: "userId e numeroSerie são obrigatórios" },
      { status: 400 }
    );
  }

  // Validar formato do número de série
  if (!/^\d{6}$/.test(numeroSerie.toString())) {
    return NextResponse.json(
      { error: "Número de série deve conter exatamente 6 dígitos" },
      { status: 400 }
    );
  }

  try {
    const numeroSerieInt = parseInt(numeroSerie, 10);

    // 1. Verificar se a placa existe na tabela Placa
    const placa = await prisma.placa.findFirst({
      where: {
        numeroSerie: numeroSerieInt,
      },
    });

    if (!placa) {
      return NextResponse.json(
        { error: "Placa não encontrada no sistema" },
        { status: 404 }
      );
    }

    // 2. Buscar a relação PlacaVaso para encontrar o vaso associado
    const placaVaso = await prisma.placaVaso.findFirst({
      where: {
        idPlaca: placa.id,
      },
      include: {
        vaso: true,
      },
    });

    if (!placaVaso) {
      return NextResponse.json(
        { error: "Placa não possui vaso associado" },
        { status: 404 }
      );
    }

    // 3. Verificar se o vaso já está vinculado a outro usuário
    if (placaVaso.vaso.idUser !== null) {
      return NextResponse.json(
        { error: "Esta placa já está vinculada a outro usuário" },
        { status: 400 }
      );
    }

    // 4. Vincular o vaso ao usuário
    const vasoAtualizado = await prisma.vaso.update({
      where: { id: placaVaso.vaso.id },
      data: { idUser: userId },
    });

    return NextResponse.json({
      success: true,
      vasoId: vasoAtualizado.id,
      placaId: placa.id,
      numeroSerie: placa.numeroSerie,
      message: "Vaso vinculado com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao vincular vaso:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
