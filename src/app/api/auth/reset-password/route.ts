import bcrypt from "bcryptjs";

import { verifyResetToken } from "@/lib/jwt";
import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const prisma = new PrismaClient();

  const { email, token, password } = await req.json();

  try {
    const payload = verifyResetToken(token);
    if (payload.email !== email) {
      return NextResponse.json(
        { error: "Token não corresponde ao email." },
        { status: 400 }
      );
    }
    const senhaCripto = await bcrypt.hash(password, 10);
    await prisma.usuario.update({
      where: { email: email },
      data: { senha: senhaCripto },
    });
    return NextResponse.json({ message: "Senha Redefinida com Sucesso" });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Token INVÁLIDO ou Expirado" },
      { status: 400 }
    );
  }
}
