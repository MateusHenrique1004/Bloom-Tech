import { generateResetToken } from "@/lib/jwt";
import transporter from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  const token = generateResetToken(email);
  const url = `${process.env.NEXTAUTH_URL}/reset-password/${token}`;
  const emailHtml = `
      <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0056b3;">Recuperação de Senha - BloomTech</h2>
        <p>Olá,</p> 
        <p>Recebemos uma solicitação para redefinir a senha da sua conta associada ao email: ${email}.</p>
        <p>Para prosseguir com a criação de uma nova senha, por favor, clique no botão abaixo:</p>
        <p style="margin: 25px 0; text-align: center;">
          <a href="${url}" target="_blank" style="background-color: #28a745; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
            Redefinir Senha
          </a>
        </p>
        <p>Se o botão não funcionar, copie e cole esta URL no seu navegador:</p>
        <p style="word-break: break-all;"><a href="${url}" target="_blank" style="color: #007bff;">${url}</a></p>
        <p><strong>Importante:</strong> Este link é válido por <strong>1 hora</strong>. Após esse período, será necessário solicitar a recuperação novamente.</p>
        <p>Se você não solicitou esta alteração, nenhuma ação é necessária e sua senha permanecerá a mesma. Por favor, ignore este email.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 0.9em; color: #666;">Atenciosamente,</p>
        <p style="font-size: 0.9em; color: #666;">Equipe BloomTech</p>
      </div>
    `;

  await transporter.sendMail({
    to: email,
    subject: "Recuperação de Senha",
    html: emailHtml,
  });

  return NextResponse.json({
    message:
      "Caso este Email esteja cadastrado, Confirme na sua caixa de entrada o recebimento",
  });
}
