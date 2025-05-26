"use client";
import BlogContent from "@/components/BlogContent";
import Zoom from "@/components/Parallax";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";

export default function Blog() {
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
      <h1 className="text-center text-4xl text-[#5AAC38] font-extrabold ">
        BloomTech Blog
        <p className="text-2xl font-bold dark:text-white ">
          Florescendo Notícias
        </p>
      </h1>
      <Zoom />
      <BlogContent />
    </>
  );
}
