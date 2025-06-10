import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userId, numeroSerie } = await req.json();

    if (!userId || !numeroSerie) {
      return NextResponse.json(
        { error: "ID do usuário e número de série da placa são obrigatórios" },
        { status: 400 }
      );
    }

    const userIdNum = parseInt(userId);
    const numeroSerieNum = parseInt(numeroSerie);

    if (isNaN(userIdNum) || isNaN(numeroSerieNum)) {
      return NextResponse.json(
        { error: "ID do usuário e número de série devem ser números válidos" },
        { status: 400 }
      );
    }

    const user = await prisma.usuario.findUnique({
      where: { id: userIdNum },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const placa = await prisma.placa.findUnique({
      where: { numeroSerie: numeroSerieNum },
      select: { numeroSerie: true, id: true },
    });

    if (!placa) {
      return NextResponse.json(
        { error: "Placa não encontrada" },
        { status: 404 }
      );
    }
    // const jaConectado = await prisma.placaVaso.findFirst({
    //   where: {
    //     idPlaca: placa.id,
    //     DataRemocao: null,
    //   },
    //   select: {
    //     placa: {
    //       select: {
    //         numeroSerie: true,
    //       },
    //     },
    //   },
    // });

    // if (jaConectado?.placa?.numeroSerie === numeroSerieNum) {
    //   return NextResponse.json(
    //     { error: "Esta placa já está vinculada a um vaso" },
    //     { status: 409 }
    //   );
    // }

    const vasoDisponivel = await prisma.vaso.findFirst({
      where: { idUser: null },
      select: { id: true },
    });

    console.log("VASO DADOS- PASSEI ", vasoDisponivel?.id);
    console.log("IDUSER- PASSEI ", user.id);

    if (!vasoDisponivel) {
      return NextResponse.json(
        { error: "Nenhum vaso disponível para conectar" },
        { status: 404 }
      );
    }

    const vasoAtualizado = await prisma.vaso.update({
      where: { id: vasoDisponivel.id },
      data: {
        idUser: user.id,
        dataAquisicao: new Date(),
        dataAtualizacao: new Date(),
      },
    });
    // const vasoAtualizado = await prisma.vaso.create({
    //   data: {
    //     idUser: user.id,
    //     dataAquisicao: new Date(),
    //     dataAtualizacao: new Date(),
    //   },
    // });

    const placaVaso = await prisma.placaVaso.create({
      data: {
        idPlaca: placa.id,
        idVaso: vasoAtualizado.id,
        DataInstalacao: new Date(),
      },
    });

    return NextResponse.json({
      message: "Vaso conectado com sucesso ao usuário",
      vaso: vasoAtualizado,
      placaVaso,
    });
  } catch (error) {
    console.error("Erro ao conectar vaso:", error);
    return NextResponse.json(
      { error: "Erro interno ao conectar vaso" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
