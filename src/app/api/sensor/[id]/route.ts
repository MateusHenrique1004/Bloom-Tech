import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const idSensor = Number(params.id);
  console.log("sensor", idSensor);

  if (isNaN(idSensor)) {
    return NextResponse.json(
      { ativo: false, error: "ID do sensor ausente ou inválido" },
      { status: 400 }
    );
  }

  const sensorVinculado = await prisma.sensorVaso.findFirst({
    where: {
      idSensor: idSensor,
      DataRemocao: null,
      vaso: {
        idUser: { not: null },
        plantios: {
          some: {
            dataFim: null,
          },
        },
      },
    },
  });

  if (sensorVinculado) {
    return NextResponse.json({ ativo: true }, { status: 200 });
  } else {
    return NextResponse.json({ ativo: false }, { status: 200 });
  }
}
