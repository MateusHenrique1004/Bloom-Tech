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
import { useEffect } from "react";

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
  // const { data: session } = useSession();
  // console.log(session);

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
          password: "",
          confirmPassword: "",
        });
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

  // const cadastrarPlantaTeste = async () => {
  //   try {
  //     const res = await fetch("/api/userPlant", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ planta: 1 }), //idplant:1 ->>teste
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       alert(`Erro: ${data.error || "Falha ao cadastrar plantio"}`);
  //     } else {
  //       alert("Plantio cadastrado com sucesso!");
  //     }
  //   } catch (error) {
  //     console.error("Erro na requisição:", error);
  //     alert("Erro de conexão ao cadastrar plantio");
  //   }
  // };

  return (
    <main className="bg-center bg-no-repeat bg-[url('/fundo3.jpg')] bg-gray-600 bg-blend-multiply h-svh">
      <div className="flex flex-col">
        <div className="w-[405px] h-auto mt-[100px] ml-[175px] justify-center items-center">
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
      </div>
      <div>
        {/* <Button
          className="bg-blue-600 hover:bg-blue-700 text-white mt-6"
          onClick={cadastrarPlantaTeste}
        ></Button> */}
      </div>
    </main>
  );
}
