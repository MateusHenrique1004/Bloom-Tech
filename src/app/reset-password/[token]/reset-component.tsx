"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const schema = z
  .object({
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

interface ResetPasswordFormProps {
  email: string;
  token: string;
}

export function ResetPasswordForm({ email, token }: ResetPasswordFormProps) {
  const [success, setSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        token,
        password: data.password,
      }),
    });

    if (res.ok) {
      setSuccess(true);
    } else {
      alert("Erro ao redefinir senha.");
    }
  };

  if (success) {
    return (
      <div className="text-center mt-10 text-green-600">
        Senha redefinida com sucesso. Você pode agora fazer login.
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">
        Nova Senha para: {email}
      </h2>

      <div>
        <label>Nova Senha</label>
        <Input type="password" {...form.register("password")} />
        {form.formState.errors.password && (
          <p className="text-red-500">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label>Confirmar Senha</label>
        <Input type="password" {...form.register("confirmPassword")} />
        {form.formState.errors.confirmPassword && (
          <p className="text-red-500">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit">Redefinir Senha</Button>
    </form>
  );
}
