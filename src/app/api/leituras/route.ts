import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { idSensor, umidade, temperatura, status } = body;
    console.log("Id Sensor", idSensor);
    console.log("umidade", umidade);
    console.log("temperatura", temperatura);
    console.log("status", status);
    if (!idSensor || umidade == null || temperatura == null || !status) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }
    // const sensorVaso = await prisma.sensorVaso.findFirst({
    //   where: {
    //     idSensor: idSensor,
    //     DataRemocao: null,
    //   },
    //   select:idSensor
    // });
    // console.log("SENSORVAS RETORNO", sensorVaso);

    // if (!sensorVaso) {
    //   return NextResponse.json(
    //     { error: "Sensor não está vinculado a um vaso ativo" },
    //     { status: 404 }
    //   );
    // }

    const leitura = await prisma.leituras.create({
      data: {
        idSensorVaso: idSensor,
        umidade,
        temperatura,
        status,
        datetime: new Date(),
      },
    });

    return NextResponse.json(
      { message: "Leitura salva com sucesso", leitura },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao salvar leitura:", error);
    return NextResponse.json(
      { error: "Erro ao processar dados" },
      { status: 500 }
    );
  }
}
