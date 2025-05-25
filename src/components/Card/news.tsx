import { faSquareArrowUpRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import fundo from "../../../public/fundo2.jpg";
import Link from "next/link";

export default function CardNews() {
  return (
    <div className="w-[350px] h-[450px]  bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
      <Image
        src={fundo}
        alt="card"
        className="w-full h-[220px]  object-cover rounded-xs"
      />

      <div className="p-2 flex flex-col justify-between h-[230px]">
        <h4 className="text-lg font-semibold text-gray-800">Teste teste.</h4>

        <p className="text-sm text-justify break-words text-gray-500 mt-2">
          Subltitule
          SubltituleSubltituleSubltituleSubltituleSubltituleSubltituleSubltituleSubltituleSubltituleSubltitule
        </p>

        <Link
          href="/"
          className="mt-4 inline-flex items-center text-green-700 font-semibold hover:underline"
        >
          Learn more
          <span className="ml-2 p-1 rounded-full">
            <FontAwesomeIcon
              icon={faSquareArrowUpRight}
              className="text-green-700"
            />
          </span>
        </Link>
      </div>
    </div>
  );
}
