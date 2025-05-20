"use client";
import Zoom from "@/components/Parallax";
import Section from "@/components/Section";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function Us() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return (
    <>
      <Zoom />
    </>
  );
}
