import Link from "next/link";
import CardNews from "../Card/news";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import Accordion from "./accordion";
import news1 from "../../../public/vase/news1.jpg";
import news2 from "../../../public/vase/news2.jpg";
import news3 from "../../../public/vase/news3.jpg";
import news4 from "../../../public/vase/news4.jpg";
import news5 from "../../../public/vase/news5.jpg";
import news6 from "../../../public/vase/news6.jpg";

export default function BlogContent() {
  return (
    <section className="flex flex-col justify-center items-center mt-20">
      <div className="mb-24">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold ">
            Fique por dentro das Notícias Botânicas!
          </h1>
        </div>
        <div className="flex justify-between items-center w-full w-max-[1100] py-8 px-[120px]">
          <div className="flex flex-col  box-border max-w-[400px] space-y-4 ">
            <h1 className="font-extrabold text-4xl text-black dark:text-white">
              Alegrin Imortal?
            </h1>

            <p className="text-lg font-medium">
              Novos estudos indicam novos metodos para manter o alegrin vivo
              mais tempo!
            </p>
            <Link
              href="/"
              className="mt-15 text-4xl  inline-flex items-center text-[#5AAC38] font-semibold hover:underline"
            >
              Ler Mais
              <span className="ml-2 p-1 rounded-full">
                <FontAwesomeIcon
                  icon={faSquareArrowUpRight}
                  className="text-[#5AAC38]"
                />
              </span>
            </Link>
          </div>

          <Image
            src={"/alecrim.jpg"}
            alt=""
            width={692}
            height={500}
            className="object-contain"
          />
        </div>
      </div>
      <div className=" space-y-8">
        <h1 className="text-4xl font-extrabold border-b-2 border-green-600 ">
          Nossos Artigos Mais Lidos
        </h1>

        <div className="grid grid-cols-3 gap-10">
          <CardNews
            src={news1}
            title="Tendência de Plantas Resistentes à Seca Aumenta nas Cidades"
            text="Com as mudanças climáticas, muitas pessoas estão buscando plantas que exigem menos água. Vasos autoirrigáveis podem ser uma ótima opção para manter essas espécies saudáveis sem desperdício."
          />
          <CardNews
            src={news2}
            title="Tecnologia Sustentável: Vasos Autoirrigáveis com Materiais Reciclados"
            text="Empresas estão lançando vasos autoirrigáveis feitos de plástico reciclado e fibra de coco, alinhando-se com a demanda por produtos ecológicos."
          />
          <CardNews
            src={news3}
            title="Cultivo de Ervas em Casa: Como Vasos Autoirrigáveis Facilitam a Vida Urbana"
            text="Com o aumento do interesse por hortas urbanas, os vasos autoirrigáveis estão se tornando populares para quem quer cultivar temperos frescos em apartamentos."
          />
          <CardNews
            src={news4}
            title=" Estudo Mostra que Plantas em Casa Melhoram a Saúde Mental"
            text="Pesquisas indicam que cuidar de plantas reduz o estresse, e os vasos autoirrigáveis ajudam a manter as plantas vivas mesmo para quem tem rotina agitada"
          />
          <CardNews
            src={news5}
            title="Inovações em IoT: Vasos que Avisam Quando a Água Está Acabando"
            text="Novos modelos de vasos autoirrigáveis estão integrando sensores inteligentes que alertam os usuários via smartphone sobre a necessidade de água ou nutrientes."
          />
          <CardNews
            src={news6}
            title="Agricultura Urbana: Projeto Social Ensina a Construir Vasos Autoirrigáveis Caseiros"
            text="ONGs estão ensinando comunidades carentes a criar seus próprios vasos autoirrigáveis com materiais acessíveis, promovendo sustentabilidade e segurança alimentar."
          />
        </div>

        <div className="flex flex-col justify-center mt-20">
          <h1 className="text-center text-5xl font-bold">
            Há algum Topico que queira falar ?
          </h1>
          <Accordion title="Pesquisas">
            <p>Voce pode contribuir com noticias e novas formas de auxilio.</p>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
