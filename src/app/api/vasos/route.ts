import { PrismaClient } from "@/generated/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId, serialNumber } = req.body;

    const vaso = await prisma.vaso.findUnique({
      where: { numeroSerie: serialNumber },
    });

    if (!vaso) {
      return res.status(404).json({ message: "Vaso não encontrado" });
    }

    const updatedVaso = await prisma.vaso.update({
      where: { id: vaso.id },
      data: { idUser: userId },
    });

    res.status(200).json(updatedVaso);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
