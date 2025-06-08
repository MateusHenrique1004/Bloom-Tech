import { PrismaClient } from "@/generated/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { serial } = req.query;

  if (!serial) {
    return res.status(400).json({ valid: false });
  }

  try {
    const serialNumber = BigInt(serial as string);
    const placa = await prisma.placa.findUnique({
      where: { numeroSerie: serialNumber },
      include: {
        placasVaso: {
          include: {
            vaso: true,
          },
        },
      },
    });

    if (!placa) {
      return res.status(200).json({ exists: false });
    }

    const vaso = placa.placasVaso[0]?.vaso;
    return res.status(200).json({
      exists: true,
      hasVaso: !!placa.placasVaso.length,
      available: vaso ? !vaso.idUser : false,
    });
  } catch (error) {
    return res.status(500).json({ valid: false });
  }
}
