"use client";
import styles from "./styles.module.scss";
import { people } from "../../data";
import CardAbout from "@/components/Card/about";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
export default function Blog() {
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
          <div className=" flex flex-col justify-center items-center space-y-4 text-center">
        <h1 className="text-5xl "> Números que contam nossa história </h1>
          <div className="flex justify-between">

                <div className="flex flex-col w-[320px] h-[220px] ">
                  <h1 className="text-green-700 text-8xl">
                    2000
                  </h1>
                  <p className="text-lg">
                    Tentivas de vender
                  </p>
                   </div>
                      <div className="flex flex-col w-[320px] h-[220px] ">
                  <h1 className="text-green-700 text-8xl">
                    560
                  </h1>
                  <p className="text-lg">
                    chances de chances de chances de asaaaaaaaaaaaaaaa
                  </p>
                   </div>
                      <div className="flex flex-col w-[320px] h-[220px] ">
                  <h1 className="text-green-700 text-8xl">
                    2000
                  </h1>
                  <p className="text-lg">
                    Tentivas de vender
                  </p>
                   </div>
                      <div className="flex flex-col w-[320px] h-[220px] ">
                  <h1 className="text-green-700 text-8xl">
                    7885
                  </h1>
                  <p className="text-lg">
                    Brigas com o HALLAND GRRRRRRRRRRRRRRRRRRRRRRRR                  </p>
                   </div>
             
             </div>
      </div>
              
       <div className="bg-green-200">
 <h1 className="text-5xl text-center">Quem são nossos fundadores </h1>        

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

  
    </main>
  );
}
