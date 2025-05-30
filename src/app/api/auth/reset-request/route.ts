import { generateResetToken } from "@/lib/jwt";
import transporter from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const email = await req.json();

  const token = generateResetToken(email);
  const url = `http://localhost:3000/reset-password/${token}`;

  await transporter.sendMail({
    to: email,
    subject: "Recuperação de Senha",
    html: `Clique no link para redefinir sua senha: <a href="${url}">${url}</a>`,
  });

  return NextResponse.json({
    message:
      "Caso este Email esteja cadastrado, Confirme na sua caixa de entrada o recebimento",
  });
}
