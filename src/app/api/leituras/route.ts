import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Dados do ESP Retornados", body);
    return NextResponse.json(
      { message: "Dados recebidos com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao receber dados:", error);
    return NextResponse.json(
      { error: "Erro ao processar dados" },
      { status: 500 }
    );
  }
}
