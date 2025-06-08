import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const plants = await prisma.planta.findMany({
      select: {
        id: true,
        nomePopular: true,
        nomeCientifico: true,
      },
    });

    return new Response(JSON.stringify(plants), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro ao buscar plantas" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
