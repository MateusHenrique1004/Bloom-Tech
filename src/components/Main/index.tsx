import Image from "next/image";

export default function Main() {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-[1200px] h-auto md:h-[640px] mx-auto mt-6">
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-6 md:px-10 py-8 md:py-0">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 text-black">
          Monitore suas
          <br />
          Plantas de onde você
          <br />
          esteja
        </h1>
        <p className="text-base md:text-lg font-medium text-gray-700 mb-6">
          Tenha o jardim de seus sonhos atráves da Bloomtech. Seu ambiente mais
          verde e saudável por meio de nossos vasos inteligentes.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
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

      <div className="w-full md:w-1/2 bg-gray-200 flex items-center justify-center py-6 md:py-0">
        <Image src="/planta.jpg" width={400} height={100} alt="Planta" />
      </div>
    </div>
  );
}
