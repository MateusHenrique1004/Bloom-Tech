// app/reset-password/[token]/page.tsx

import { verifyResetToken } from "@/lib/jwt";
import React from "react";
import { ResetPasswordForm } from "./reset-component";

interface ResetPasswordPageProps {
  params: { token: string };
}

export default async function ResetPasswordPage({
  params,
}: ResetPasswordPageProps) {
  const token = params.token;

  let email: string;
  try {
    const payload = verifyResetToken(token);
    email = payload.email;
  } catch (err) {
    console.log(err);

    return (
      <div className="text-red-500 text-center mt-8">
        Token inválido ou expirado.
      </div>
    );
  }

  return <ResetPasswordForm email={email} token={token} />;
}
