"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import CardPlants from "../plants/plant";
import teste from "../../../public/fundo3.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function CarouselPlants() {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
  });

  useEffect(() => {
    timer.current = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [instanceRef]);
  const cards = Array.from({ length: 8 }, (_, i) => ({
    title: `Planta ${i + 1}`,
    text: "Descrição da planta",
    src: teste,
  }));

  return (
    <section className="relative w-full max-w-[1340px] mx-auto px-4 py-8">
      <div className="keen-slider" ref={sliderRef}>
        {cards.map((card, index) => (
          <div key={index} className="keen-slider__slide">
            <CardPlants {...card} />
          </div>
        ))}
      </div>

      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full z-10"
        onClick={() => instanceRef.current?.prev()}
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full z-10"
        onClick={() => instanceRef.current?.next()}
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </section>
  );
}
