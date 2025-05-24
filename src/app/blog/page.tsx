"use client";
import styles from "./styles.module.scss";
import { people } from "../../components/Card/data";
import CardAbout from "@/components/Card/about";
import { useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
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
    </main>
  );
}
