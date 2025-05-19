import Image from "next/image";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <main className="bg-center bg-no-repeat bg-[url('/fundo3.jpg')] bg-gray-600 bg-blend-multiply h-svh ">
        <div className="flex flex-col">
          <div className="w-[405px] h-[584px] mt-[100px] ml-[175px] justify-center items-center">
            <div className=" font-bold space-y-5 text-white">
              <h1 className="text-4xl ">Cadastrar-se</h1>
            </div>

            <div className="  justify items-center mt-10 space-y-5 text-white">
              <p className="block mb-2 text-sm font-bold  dark:text-white">
                Nome
              </p>
              <input
                type="name"
                id="name"
                className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Malcon X"
                required
              />

              <p className="block mb-2 text-sm font-bold  dark:text-white">
                Email
              </p>
              <input
                type="email"
                id="email"
                className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="MateusJunqueira@gmail.com"
                required
              />

              <p className="block mb-2 text-sm font-bold  dark:text-white">
                Telefone
              </p>
              <input
                type="tel"
                id="tel"
                className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="(12) 99185-5231"
                required
              />

              <p className="block mb-2 text-sm font-bold dark:text-white">
                Senha
              </p>

              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />

              <p className="block mb-2 text-sm font-bold dark:text-white">
                Confirmar Senha
              </p>

              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />

              <div className="flex flex-row justify-center items-center">
                <input
                  id="terms"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />

                <p>
                  Eu concordo com os{" "}
                  <span className="text-white font-bold underline ">
                    Termos e Políticas
                  </span>
                </p>
              </div>
              <button className=" w-full bg-[#3c7225] hover:bg-[#5AAC38] text-white font-bold py-2 px-4 rounded-full">
                Cadastrar
              </button>
              
      <div className="flex flex-col justify-center items-center mt-5 space-y-5">
          <hr className="border-t border-green-800 border-1 w-full mx-auto" />
          
           <Link className="block text-lg font-bold text-white dark:text-white" href={'/login'}>Já tem Conta? Login</Link>

        </div>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
