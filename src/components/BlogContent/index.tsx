import Link from "next/link";
import CardNews from "../Card/news";
import CarrousselNews from "../Carroussel/news";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";

export default function BlogContent() {
  return (
    <section className="flex flex-col justify-center items-center mt-20">
        <h1 className="text-4xl font-extrabold"> Fique por dentro das notícias botanicas! </h1>
      <div className="flex  justify-between items-center w-full w-max-[1100] py-8 px-[120px]">
             <div className=" flex flex-col box-border max-w-[400px] space-y-4 ">
               <h1 className="font-extrabold text-5xl text-black">
              Novas Maneiras de Manter seu Alegrin vivo nas sombras!
               </h1>
     
               <p className="text-lg">
              Novos estudos indicam novos metodos para manter o alegrin vivo mais tempo!
               </p>
            <Link
          href="/"
          className="mt-4 text-4xl  inline-flex items-center text-green-700 font-semibold hover:underline"
        >
          Learn more
          <span className="ml-2 p-1 rounded-full">
            <FontAwesomeIcon
              icon={faSquareArrowUpRight}
              className="text-green-700"
            />
          </span>
        </Link>
             </div>
     
             <Image
               src={"/alecrim.jpg"}
               alt=""
               width={692}
               height={500}
               className=" w-[692px] h-[500px]"
             />
           </div>

      <div className=" space-y-8">
        <h1 className="text-5xl font-extrabold text-left">
          Nossos Artigos Mais Lidos
        </h1>

        <div className="grid grid-cols-3 gap-10">
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
          <CardNews />
        </div>
      </div>
    </section>
  );
}
