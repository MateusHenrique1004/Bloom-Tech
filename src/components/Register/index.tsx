"use client";

import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertDialogDefault } from "../Alert/alertDialog";

const formSchema = z
  .object({
    name: z.string().min(2, "Nome muito curto"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(10, "Telefone inválido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Mínimo 6 caracteres"),
    terms: z.boolean().refine((val) => val, {
      message: "Você precisa aceitar os termos",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: values.name,
        email: values.email,
        senha: values.password,
        telefone: values.phone,
      }),
    });
    const data = await res.json();

    if (res.ok) {
      toast(`Usuário Cadastrado com Sucesso`);
      alert(data.message);
      router.push("/login");
    } else {
      alert(data.message);
    }
  }

  return (
    <main className="bg-center bg-no-repeat bg-[url('/fundo3.jpg')] bg-gray-600 bg-blend-multiply min-h-screen flex justify-start items-start py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white bg-opacity-50 p-8 rounded-lg shadow-lg ml-8 text-[]">
        <h1 className="text-4xl font-bold text-[#3A5B22] text-center mb-8">
          Cadastrar-se
        </h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 text-white"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      className=""
                      placeholder="Oliver Almeida"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="exemplo@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="(12) 99185-5231"
                      {...field}
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
                <FormItem className="text-black">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="text-black">
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Input
                      type="checkbox"
                      className="w-4 h-4"
                      {...field}
                      checked={field.value}
                    />
                  </FormControl>
                  <FormLabel className="text-sm  text-black">
                    Eu concordo com os <AlertDialogDefault />
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full bg-[#3A5B22] hover:bg-[#5AAC38]"
              type="submit"
            >
              Cadastrar
            </Button>

            <div className="flex flex-col justify-center items-center mt-5 space-y-5">
              <hr className="border-t border-green-800 border-1 w-full mx-auto" />
              <Link
                className="block text-lg font-bold text-black"
                href="/login"
              >
                Já tem Conta? Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
