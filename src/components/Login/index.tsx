"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { loginSchema, LoginFormValues } from "../../schemas/loginSchema";
import Link from "next/link";
import Image from "next/image";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (res?.ok) {
        router.push("/dashbord");
      } else {
        let errorMessage = "Ocorreu um erro ao tentar fazer login.";
        if (res?.error === "CredentialsSignin") {
          errorMessage = "Credenciais inválidas. Verifique seu email ou senha.";
        } else if (res?.error) {
          errorMessage = res.error;
        }

        form.setError("root", { message: errorMessage });
        console.error("Erro de login (NextAuth):", res?.error);
      }
    } catch (error) {
      console.error("Erro inesperado no onSubmit:", error);
      form.setError("root", {
        message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
      });
    }
    setIsLoading(false);
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center p-8 h-screen overflow-y-auto">
        <div className="w-full max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2 text-center mb-8">
                {" "}
                <h1 className="text-4xl font-bold">Bem-vindo de volta!</h1>
                <p className="text-xl text-muted-foreground">
                  Entre com suas credenciais
                </p>{" "}
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="seu@email.com"
                        type="email"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full text-right text-sm">
                <Link
                  href={"/reset"}
                  className="text-sm text-blue-600 hover:underline focus:outline-none"
                >
                  Esqueceu a Senha?
                </Link>
              </div>

              {form.formState.errors.root && (
                <FormMessage className="w-full text-center text-red-500">
                  {form.formState.errors.root.message}
                </FormMessage>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <div className="mt-4 text-center text-sm">
                <span>Ainda não tem cadastro? </span>
                <Link
                  href="/register"
                  className="font-medium text-primary hover:underline"
                >
                  Cadastrar
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="hidden md:block w-full h-screen">
        <Image
          className="object-cover w-full h-full"
          src="/fundo2.jpg"
          width={1920}
          height={1080}
          alt="Imagem de fundo da página de login"
          priority
        />
      </div>
    </>
  );
}
