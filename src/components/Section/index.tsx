import { faBarcode, faSeedling, faTachographDigital } from "@fortawesome/free-solid-svg-icons";
import Carroussel from "../Carroussel";
import Image from "next/image";
import Card from "../Card";

export default function Section() {
  return (
    <>
    <section className="w-[1400px] h-[500px] flex flex-row justify-center items-center space-x-10 mt-20 ml-44 ">
     <Card icon={faTachographDigital} title={'Mais Tecnologia'} subtitle={'Com a tecnologia de IoT integrada, podemos garantir a máxima eficiencia para sua planta'}/>

     <Card icon={faBarcode} title={'Scaneia seu vaso'} subtitle={'Cada Vaso é Único e possui suas especificidade, Scaneie o seu e usuflua do seu Bloom Tech'}/>

    <Card icon={faSeedling} title={'Floresça'} subtitle={'Nosso Vaso possibilita a todos que desejam, uma planta explendida e saudável'} />
    </section>

    <section className="w-[1340px] h-[400px] flex flex-col ml-44 justify-center items-center">
    <Carroussel/>
    </section>

    <section className="w-[1340px]  flex flex-col ml-44  justify-center items-center  ">
      <div className="w-full grid grid-cols-2 gap-16 place-self-auto ">
      <div className="flex flex-col justify-center items-center ">
        <div className="flex flex-col space-y-3">

        <h1 className="text-7xl font-bold text-white">Por que Confiar em Nós?</h1>
        <span className="text-lg"> Porque SOMOS OS MELHORES! Atuamos com praticidade, confiabilidade e amor!!!</span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        

      <div className="w-[400px]">
        <Image className="object-fit" src={'/trustUs.avif'} width={400} height={200} alt="Confie em Nós"/>
      </div>
      </div>
      </div>
    </section>

    </>
  );
}
