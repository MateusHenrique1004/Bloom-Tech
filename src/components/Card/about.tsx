"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";
export default function CardAbout({ name, bio, src, color }) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [2, 1]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <div style={{ backgroundColor: color }} className={styles.card}>
        <motion.div style={{ scale }}>
          <Image src={"/fundo2.jpg"} alt="" width={100} height={100} />
        </motion.div>
      </div>
    </div>
  );
}
