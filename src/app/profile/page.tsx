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
import Link from "next/link";
import Image from "next/image";

import planta1 from "../../../public/plants/1.jpg";
import planta2 from "../../../public/plants/2.jpg";
import planta3 from "../../../public/plants/3.jpg";
import planta4 from "../../../public/plants/4.jpg";
import plantaDefault from "../../../public/plants/default.jpg";
import { StaticImageData } from "next/image";

const plantImages: Record<number, StaticImageData> = {
  1: planta1,
  2: planta2,
  3: planta3,
  4: planta4,
  5: plantaDefault,
};

const formSchema = z
  .object({
    name: z.string().optional(),
    email: z.string().email("Email inválido").optional(),
    phone: z.string().optional(),
    password: z.string().min(6, "Mínimo 6 caracteres").optional(),
  })
  .refine(
    (data) => !!data.name || !!data.email || !!data.phone || !!data.password,
    { message: "Preencha pelo menos um campo" }
  );

export default function Profile() {
  const router = useRouter();
  const [plantaAtual, setPlantaAtual] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
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
    <main className="bg-center bg-no-repeat bg-[url('/fundo3.jpg')] bg-gray-600 bg-blend-multiply min-h-screen p-10">
      <div className="flex flex-row gap-16 justify-center">
        <div className="w-[420px] bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-4xl font-bold text-black">Editar Perfil</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-10 space-y-5 text-black"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite seu nome"
                        {...field}
                        className="border-1 border-black"
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
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="exemplo@email.com"
                        className="border-1 border-black"
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
                        className="border-1 border-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full text-left text-sm">
                <Link
                  href={"/reset"}
                  className="text-sm text-blue-600 hover:underline focus:outline-none"
                >
                  Redefinir Senha
                </Link>
              </div>

              <Button
                className="w-full bg-[#3c7225] hover:bg-[#5AAC38]"
                type="submit"
              >
                Atualizar dados
              </Button>
            </form>
          </Form>
        </div>
        <div
          className={`w-[380px] bg-white p-6 rounded-xl shadow-md ${
            plantaAtual
              ? "flex flex-col h-auto"
              : "flex flex-col justify-center items-center h-fit text-center"
          }`}
        >
          <h2 className="text-2xl font-bold text-black mb-4">
            {plantaAtual ? "Sua planta atual" : "Nenhuma planta selecionada"}
          </h2>

          {plantaAtual ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-full h-40 rounded-md overflow-hidden">
                <Image
                  src={plantImages[plantaAtual.id] || plantaDefault}
                  alt={plantaAtual.nomeCientifico}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-black text-sm space-y-2 w-full ">
                <p>
                  <span className="font-semibold">Nome popular:</span>{" "}
                  {plantaAtual.nomePopular}
                </p>
                <p>
                  <span className="font-semibold">Nome científico:</span>{" "}
                  {plantaAtual.nomeCientifico}
                </p>
              </div>
              <Button
                onClick={() => router.push("/plantas")}
                className="w-full bg-[#3c7225] hover:bg-[#5AAC38] mt-15"
              >
                Trocar planta
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => router.push("/plantas")}
              className="mt-2 bg-[#3c7225] hover:bg-[#5AAC38]"
            >
              Escolher planta
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
