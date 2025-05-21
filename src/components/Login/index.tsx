"use client";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    signIn("credentials", {
      ...data,
      callbackUrl: "/dashbord",
    });
  }

  return (
    <>
      <form onSubmit={login}>
        <div className="flex flex-col">
          <div className="w-[405px] h-[584px] mt-[220px] ml-[175px] justify-center items-center ">
            <div className=" font-bold space-y-5">
              <h1 className="text-4xl">Bem-Vindo de Volta!</h1>
              <p className="text-2xl">Entre com suas Credenciais</p>
            </div>

            <div className="  justify items-center mt-10 space-y-5">
              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </p>
              <input
                name="email"
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="monica@gmai.com"
                required
              />

              <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Senha
              </p>

              <input
                name="password"
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />

              <div className="flex justify-between items-center">
                <Link
                  className="block mb-2 text-sm font-medium text-blue-700 dark:text-white"
                  href={"/forgot"}
                >
                  {" "}
                  Esqueceu a senha?{" "}
                </Link>
              </div>
              <button
                className=" w-full bg-[#3c7225] hover:bg-[#5AAC38] text-white font-bold py-2 px-4 rounded-full"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="flex flex-col justify-center items-center mt-12 space-y-5">
              <hr className="border-t border-green-800 border-1 w-full mx-auto" />

              <Link
                className="block text-sm font-medium text-[#5AAC38] dark:text-white"
                href={"/register"}
              >
                {" "}
                Ainda não tem Cadastro? Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </form>
      <div className="w-full h-[900px] ">
        <Image
          className="object-cover w-full h-full rounded-2xl"
          src="/fundo2.jpg"
          width={600}
          height={600}
          alt="Imagem_Login"
        />
      </div>
    </>
  );
}
