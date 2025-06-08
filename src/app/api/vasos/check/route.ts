import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serial = searchParams.get("serial");

  if (!serial) {
    return NextResponse.json(
      { error: "Número de série é obrigatório" },
      { status: 400 }
    );
  }

  // Validar se o serial tem 6 dígitos
  if (!/^\d{6}$/.test(serial)) {
    return NextResponse.json({
      exists: false,
      available: false,
      message: "Número de série deve conter exatamente 6 dígitos",
    });
  }

  try {
    const numeroSerie = parseInt(serial, 10);

    // 1. Verificar se a placa existe na tabela Placa
    const placa = await prisma.placa.findFirst({
      where: {
        numeroSerie: numeroSerie,
      },
    });

    if (!placa) {
      return NextResponse.json({
        exists: false,
        available: false,
        message: "Placa não encontrada no sistema",
      });
    }

    // 2. Verificar se a placa já está vinculada a algum usuário
    // Buscar na tabela PlacaVaso para encontrar o vaso associado a esta placa
    const placaVaso = await prisma.placaVaso.findFirst({
      where: {
        idPlaca: placa.id,
      },
      include: {
        vaso: true,
      },
    });

    if (!placaVaso) {
      return NextResponse.json({
        exists: true,
        available: false,
        message: "Placa não possui vaso associado",
      });
    }

    // 3. Verificar se o vaso já está vinculado a um usuário
    if (placaVaso.vaso.idUser !== null) {
      return NextResponse.json({
        exists: true,
        available: false,
        message: "Esta placa já está vinculada a outro usuário",
      });
    }

    // 4. Se chegou até aqui, a placa existe e está disponível
    return NextResponse.json({
      exists: true,
      available: true,
      message: "Placa disponível para vinculação",
      placaId: placa.id,
      vasoId: placaVaso.vaso.id,
    });
  } catch (error) {
    console.error("Erro ao verificar placa:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
