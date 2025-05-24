"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";
export default function CardAbout({
  i,
  name,
  bio,
  src,
  color,
  progress,
  range,
  targetScale,
}) {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });
 

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);

 const  scale= useTransform(progress, range, [1, targetScale]);


  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        style={{scale, backgroundColor: color, top: `calc(-10% + ${i * 25}px)` }}
        className={styles.card}
      >
        <motion.div style={{ scale: imageScale }}>
          <Image src={"/fundo2.jpg"} alt="" width={100} height={100} />
        </motion.div>
      </motion.div>
    </div>
  );
}
