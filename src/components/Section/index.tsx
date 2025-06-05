import {
  faBarcode,
  faSeedling,
  faSquareArrowUpRight,
  faTachographDigital,
} from "@fortawesome/free-solid-svg-icons";
import Carroussel from "../Carroussel";
import teste from "../../../public/fundo3.jpg";
import Image from "next/image";
import Card from "../Card";
import { FadeInText } from "../Fade/FadeInText";
import CardTestimoninal from "../Card/testimonial";
import Link from "next/link";
import Accordion from "../BlogContent/accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardPlants from "../plants/plant";
import CarouselPlants from "../Carroussel/plant";

export default function Section() {
  return (
    <>
      <section className="flex flex-col justify-center items-center mt-5">
        <div className="text-center text-5xl font-bold text-[#5AAC38] mt-40 ">
          <h1>O Vaso de Plantas mais Prático que há </h1>
        </div>

        <div className="w-full max-w-[1400px] h-auto flex flex-wrap justify-center items-center gap-6 md:space-x-10 md:h-[500px]">
          <Card
            icon={faTachographDigital}
            title={"Mais Tecnologia"}
            subtitle={
              "Com a tecnologia de IoT integrada, podemos garantir a máxima eficiencia para sua planta"
            }
          />

          <Card
            icon={faBarcode}
            title={"Scaneia seu vaso"}
            subtitle={
              "Cada Vaso é Único e possui suas especificidade, Scaneie o seu e usuflua do seu Bloom Tech"
            }
          />

          <Card
            icon={faSeedling}
            title={"Floresça"}
            subtitle={
              "Nosso Vaso possibilita a todos que desejam, uma planta explendida e saudável"
            }
          />
        </div>
      </section>

      <section className="w-full max-w-[1340px] mx-auto px-4 h-auto md:h-[400px] flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold"> Vasos mais Vendidos</h1>
        <CarouselPlants />
      </section>

      <FadeInText direction="left">
        <section className="w-full max-w-[1340px] mx-auto px-4 flex flex-col my-20 justify-center items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 place-self-auto">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col space-y-3">
                <h1 className="text-[#5AAC38] text-7xl font-bold dark:text-white break-words">
                  Por que Confiar em Nós?
                </h1>
                <span className="text-lg text-justify">
                  Porque somos uma empresa que sempre busca tratar nossos
                  clientes com o melhor! Atuamos com praticidade, confiabilidade,
                  amor e segurança! Todos nossos produtos atendem as demandas
                  atuais do mercado com um toque único nosso: a Tecnologia.
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="w-full max-w-[400px] mx-auto">
                <Image
                  className="object-contain"
                  src={"/trustUs.avif"}
                  width={400}
                  height={200}
                  alt="Confie em Nós"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeInText>

      <section className="bg-center bg-no-repeat bg-[url('/fundo1.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl break-words">
            Afinal, quem é a Bloomtech?
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
            A BloomTech é uma Empresa Focada em Vasos de Plantas Autonomos.
            Nossa ideia é trazer uma maior gama de opções para todos que anseiam
            por um Jardim Caseiro.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Link
              href="/us"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#5AAC38] hover:bg-[#3c7225] focus:ring-4 focus:ring-emerald-800 dark:focus:ring-emerald-950"
            >
              Sobre Nós
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <FadeInText direction="right">
        <section className="w-full max-w-[1340px] mx-auto px-4 flex flex-col my-20 justify-center items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 place-self-auto">
            <div className="flex flex-col justify-center items-center">
              <div className="w-full h-full">
                <Image
                  className="w-full h-full object-center"
                  src={"/blog.jpg"}
                  width={800}
                  height={200}
                  alt="Confie em Nós"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col space-y-3">
                <h1 className="text-[#5AAC38] text-7xl font-bold dark:text-white break-words">
                  BloomTech Blog
                </h1>
                <span className="text-lg">
                  Fique por dentro das novidades da botanica e suas autonomias!
                </span>
                <Link
                  href="/blog"
                  className="text-4xl inline-flex items-center text-[#5AAC38] font-semibold hover:underline"
                >
                  Blog
                  <span className="ml-2 p-1 rounded-full">
                    <FontAwesomeIcon
                      icon={faSquareArrowUpRight}
                      className="text-[#5AAC38]"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeInText>

      <section className="flex flex-col justify-center items-center">
        <div className="flex flex-col mt-20 space-y-10">
          <h1 className="text-[#5AAC38] text-5xl font-bold dark:text-white">
            O Que Nossos Clientes Dizem?
          </h1>

          <p className="text-center text-2xl mb-6">
            Dê Uma Olhada No Review de nossos Produtos!!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 mb-16 ml-4 border border-[#3c7225] rounded-lg shadow-xs dark:border-gray-700 md:mb-12 bg-white dark:bg-gray-800">
          <CardTestimoninal
            name="Magna Flores"
            profession="Arquiteta"
            src="/people/rosto1.jpg"
            title="Que Fantástico"
            subtitle="Agora minhas plantas se mantém sem nenhuma problema! Amei"
          />
          <CardTestimoninal
            name="Roger Ébano"
            profession="Desempregado"
            src="/people/rosto2.jpg"
            title="Podem Melhorar"
            subtitle="Podem Melhorar o valor, que tal ser Grátis? rsrsrs Excelente"
          />
          <CardTestimoninal
            name="Cintia Oliveira"
            profession="Escritora"
            src="/people/rosto3.jpg"
            title="O Item mais prático da BOTÂNICA "
            subtitle="Eu tinha difuldades com minhas plantas, agora o vaso da me auxilia. Grata!"
          />

          <CardTestimoninal
            name="Abner Tomilho"
            profession="Professor"
            src="/people/rosto4.jpg"
            title="Já tenho 5 Vasos!!!"
            subtitle="E quero mais, com esses vasos, meu sonho de ter meu jardim é real e tudo no meu AP!!!"
          />
        </div>

        <div className="flex flex-col justify-center mt-20">
          <h1 className="text-center text-5xl font-bold">
            Perguntas Frequentes - FAQ
          </h1>
          <Accordion title="Como Scanear meu Vaso?">
            <p>Voce pode contribuir com noticias e novas formas de auxilio.</p>
          </Accordion>
          <Accordion title="Onde Trocar de Planta?">
            <p>Voce pode contribuir com noticias e novas formas de auxilio.</p>
          </Accordion>
          <Accordion title="Como trocar minha Placa?">
            <p>Voce pode contribuir com noticias e novas formas de auxilio.</p>
          </Accordion>
          <Accordion title="Quando usar meu vaso?">
            <p>Voce pode contribuir com noticias e novas formas de auxilio.</p>
          </Accordion>
        </div>
      </section>
    </>
  );
}
