import { PrismaClient } from "@/generated/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { userId, numeroSerie } = req.body;
    const serialNumber = BigInt(numeroSerie);

    const placaVaso = await prisma.placaVaso.findFirst({
      where: {
        placa: { numeroSerie: serialNumber },
        vaso: { idUser: 0 },
      },
      include: { vaso: true },
    });

    if (!placaVaso) {
      return res.status(404).json({
        error: "Vaso não encontrado ou já vinculado",
      });
    }

    await prisma.vaso.update({
      where: { id: placaVaso.vaso.id },
      data: { idUser: userId },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno" });
  }
}
