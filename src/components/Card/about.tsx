"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useScroll, motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
export default function CardAbout({
  i,
  name,
  bio,
  src,
  color,
  linkedin,
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

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={styles.card}
      >
        <h2>{name}</h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{bio}</p>
            <span className="mt-5">
              <Link href={linkedin} target="_blank">
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </Link>
            </span>
          </div>

          <div className={styles.imageContainer}>
            <motion.div className={styles.inner} style={{ scale: imageScale }}>
              <Image fill src={`/people/${src}`} alt="image" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
