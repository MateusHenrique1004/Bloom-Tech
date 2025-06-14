"use client";

import { signOut, useSession } from "next-auth/react";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const formSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email("Email inválido").optional(),
    phone: z.string().optional(),
    password: z.string().min(6, "Mínimo 6 caracteres").optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => !!data.name || !!data.email || !!data.phone || !!data.password,
    { message: "Preencha pelo menos um campo" }
  )
  .refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export default function Profile() {
  const router = useRouter();
  const [plantaAtual, setPlantaAtual] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/users/");
      if (res.ok) {
        const user = await res.json();
        form.reset({
          name: user.nome || "",
          email: user.email || "",
          phone: user.telefone || "",
          password: user.senha || "",
          confirmPassword: user.senha || "",
        });
      }

      const plantaRes = await fetch("/api/userPlant");

      if (plantaRes.ok) {
        const data = await plantaRes.json();
        const todosPlantios =
          data.vasos?.flatMap((vaso) => vaso.plantios) || [];

        console.log("PLANTIOS DO USUÁRIO:", todosPlantios);

        const ativo = todosPlantios.find(
          (plantio) => !plantio.dataFim || plantio.dataFim === null
        );

        console.log("Plantio ativo encontrado:", ativo);

        setPlantaAtual(ativo?.planta);
      }
    }

    fetchData();
  }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await fetch("/api/users", {
      method: "PUT",
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
      alert("Dados atualizados! Você será deslogado.");
      signOut();
      router.push("/");
    } else {
      alert(data.message);
    }
  }

  return (
    <main className="bg-center bg-no-repeat bg-[url('/fundo3.jpg')] bg-gray-600 bg-blend-multiply h-svh p-10">
      <div className="flex justify-between w-full gap-10">
        <div className="w-[420px] bg-white/10 p-6 rounded-xl">
          <h1 className="text-4xl font-bold text-white">Editar Perfil</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-10 space-y-5 text-white"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
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
                  <FormItem>
                    <FormLabel>Nova senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Nova senha..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme a senha..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full bg-[#3c7225] hover:bg-[#5AAC38]"
                type="submit"
              >
                Atualizar dados
              </Button>
            </form>
          </Form>
        </div>

        <div className="flex-1 bg-white/10 text-white p-6 rounded-xl h-fit">
          <h2 className="text-2xl font-bold mb-4">Sua planta atual</h2>

          {plantaAtual ? (
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Nome popular:</span>{" "}
                {plantaAtual.nomePopular}
              </p>
              <p>
                <span className="font-semibold">Nome científico:</span>{" "}
                {plantaAtual.nomeCientifico}
              </p>
              <Button
                onClick={() => router.push("/plantas")}
                className="mt-4 bg-blue-600 hover:bg-blue-700"
              >
                Trocar planta
              </Button>
            </div>
          ) : (
            <div>
              <p>Você ainda não escolheu uma planta.</p>
              <Button
                onClick={() => router.push("/plantas")}
                className="mt-4 bg-blue-600 hover:bg-blue-700"
              >
                Escolher planta
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
