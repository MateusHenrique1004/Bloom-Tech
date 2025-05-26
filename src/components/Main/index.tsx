import Image from "next/image";

export default function Main() {
  return (
    <div className="flex w-full max-w-[1200px] h-[640px] mx-auto mt-6">
      <div className="w-1/2 bg-white flex flex-col justify-center px-10 ">
        <h1 className="text-5xl font-bold leading-tight mb-4 text-black">
          Monitore suas
          <br />
          Plantas de onde você
          <br />
          esteja
        </h1>
        <p className="text-lg font-medium text-gray-700 mb-6">
          Tenha o jardim de seus sonhos atráves da Bloomtech. Seu ambiente mais
          verde e saudável por meio de nossos vasos inteligentes.
        </p>
        <div className="flex items-center space-x-4">
          <button className="bg-[#5AAC38] hover:bg-[#3c7225] text-white font-bold py-2 px-4 rounded">
            Scanear
          </button>
          <span className="text-sm text-gray-600">
            +5.000 pessoas
            <br />
            compraram este produto.
          </span>
        </div>
      </div>

      <div className="w-1/2 bg-gray-200 flex items-center justify-center">
        <Image src="/planta.jpg" width={400} height={100} alt="Planta" />
      </div>

      <section></section>
    </div>
  );
}
