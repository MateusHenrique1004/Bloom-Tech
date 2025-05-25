import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CardNewsProps {
  title: string;
  text: string;
  src: StaticImageData;
}

export default function CardNews({ title, text, src }: CardNewsProps) {
  return (
    <div className="w-[350px] h-[450px]  bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
      <Image
        src={src}
        alt="card"
        className="w-full h-[220px]  object-cover rounded-xs"
      />

      <div className="p-2 flex flex-col justify-between h-[230px]">
        <h4 className="text-lg font-semibold text-black">{title}</h4>

        <p className="text-sm text-justify break-words font-medium text-gray-700 mt-2">
          {text}
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex items-center text-[#5AAC38] font-semibold hover:underline"
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
    </div>
  );
}
