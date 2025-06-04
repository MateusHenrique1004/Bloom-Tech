import { faBasketShopping, faShop, faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface CardPlantsProps {
  title: string;
  text: string;
  src: StaticImageData;
}

export default function CardPlants({ title, text, src }: CardPlantsProps) {
  return (
    <div className="w-[295px] h-[317px]  bg-white shadow-md rounded-[10px] overflow-hidden border border-gray-200">
      <Image
        src={src}
        alt="card"
        className="w-full h-[217px]  object-cover rounded-xs hover:scale-95"
      />

      <div className="p-2 flex flex-col justify-between">
        <h4 className="text-lg font-semibold text-black">{title}</h4>

        
        <div className="flex flex-row justify-between">
        <p className="text-sm text-justify break-words font-medium text-gray-700 mt-2">
          {text}
        </p>
        <span className="ml-2 p-1 rounded-full ">
            <FontAwesomeIcon
              icon={faBasketShopping}
              className="text-[#5AAC38]"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
