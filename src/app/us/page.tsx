"use client";
import styles from "./styles.module.scss";
import { people } from "../../data";
import CardAbout from "@/components/Card/about";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import Numbers from "./numbers";
export default function Us() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  //  useEffect(() => {
  //   const lenis = new Lenis({
  //     lerp: 0.1,
  //     smoothWheel: true,
  //   });

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   const rafId = requestAnimationFrame(raf);

  //   return () => {
  //     cancelAnimationFrame(rafId);
  //     lenis.destroy();
  //   };
  // }, []);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={container} className={styles.main}>
      <div className="flex  justify-between items-center w-full w-max-[1100] py-16 px-[120px]">
        <div className=" flex flex-col box-border max-w-[400px] space-y-4 ">
          <h4 className="font-bold text-3xl text-green-600">Sobre Nós</h4>
          <h1 className="font-extrabold text-5xl text-black">
            Modernidade e Sustentabilidade em Vasos
          </h1>

          <p className="text-lg">
            Somos a BloomTech, uma staturp que brasileira fundada por 3
            estudantes de ADS. Nosso objetivo é trazer novidade em seu
            plantio...
          </p>
        </div>

        <Image
          src={"/people/us.png"}
          alt=""
          width={692}
          height={500}
          className=" w-[692px] h-[500px]"
        />
      </div>
      <div className=" flex flex-col justify-center items-center space-y-4 text-center py-20">
        <h1 className="text-5xl "> Números que contam nossa história </h1>
        <div className="flex justify-between">
          <Numbers
            title="2024"
            text="Iniciamos nossa jornada através de um projeto visionário na Faculdade"
          />
          <Numbers
            title="x300"
            text="Remodelamos, aperfoaçamos, melhoramos nossa idea,"
          />
          <Numbers
            title="1000"
            text="Tentativas até conseguimos de fato aplicar o que queriamos"
          />
          <Numbers
            title="0%"
            text="Era nossa chance de Desistir da BloomTech"
          />
        </div>
      </div>

      <div className="bg-transparent">
        <h1 className="text-5xl font-extrabold text-center">
          Quem são nossos fundadores?
        </h1>

        {people.map((project, index) => {
          const targetScale = 1 - (people.length - index) * 0.05;
          return (
            <CardAbout
              key={index}
              i={index}
              {...project}
              range={[index * 0.25, 1]}
              progress={scrollYProgress}
              targetScale={targetScale}
            />
          );
        })}
      </div>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-5xl font-extrabold "> Nossos Maiores Valores</h1>

        <div className="flex justify-between items-center w-full w-max-[1100] py-16 px-[120px] ">
          <Image
            src={"/people/pessoa_pc.png"}
            alt=""
            width={692}
            height={500}
            className=" w-[692px] h-[500px]"
          />
          <div className=" flex flex-col box-border max-w-[400px] space-y-4 text-center ">
            <h1 className="text-5xl font-extrabold ">
              {" "}
              Testar, Errar, Tentar e Acertar
            </h1>
            <p className="text-lg text-justify">
              Para garantir que estamos no caminho certo, é importante testar,
              errar, tentar e acertar. Devemos ser iterativos, não ter medo de
              errar e, se errarmos, errar rápido e aprender com os nossos erros.{" "}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
