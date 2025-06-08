"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import CardPlants from "../plants/plant";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { StaticImageData } from "next/image";

import planta1 from "../../../public/plants/1.jpg";
import planta2 from "../../../public/plants/2.jpg";
import planta3 from "../../../public/plants/3.jpg";
import planta4 from "../../../public/plants/4.jpg";
import plantaDefault from "../../../public/plants/default.jpg";

const plantImages: Record<number, StaticImageData> = {
  1: planta1,
  2: planta2,
  3: planta3,
  4: planta4,
};

interface Plant {
  id: number;
  nome: string;
  nomeCientifico: string;
}

export default function CarouselPlants() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
  });

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("/api/plants");
        if (!response.ok) {
          throw new Error("Erro ao buscar plantas");
        }
        const data = await response.json();
        setPlants(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  useEffect(() => {
    if (plants.length > 0) {
      timer.current = setInterval(() => {
        instanceRef.current?.next();
      }, 3000);
    }

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [instanceRef, plants]);

  if (loading) return <div className="text-center py-8">Carregando...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Erro: {error}</div>;
  if (plants.length === 0)
    return <div className="text-center py-8">Nenhuma planta encontrada</div>;

  return (
    <section className="relative w-full max-w-[1340px] mx-auto px-4 py-8">
      <div className="keen-slider" ref={sliderRef}>
        {plants.map((plant) => {
          const plantImage = plantImages[plant.id] || {
            ...plantaDefault,
            alt: `Imagem padrão - ${plant.nome}`,
          };

          return (
            <div key={plant.id} className="keen-slider__slide">
              <CardPlants
                name={plant.nomePopular}
                nameCientific={plant.nomeCientifico}
                src={plantImage}
              />
            </div>
          );
        })}
      </div>

      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full z-10 hover:bg-gray-100 transition-colors"
        onClick={() => instanceRef.current?.prev()}
        aria-label="Planta anterior"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 shadow rounded-full z-10 hover:bg-gray-100 transition-colors"
        onClick={() => instanceRef.current?.next()}
        aria-label="Próxima planta"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </section>
  );
}
