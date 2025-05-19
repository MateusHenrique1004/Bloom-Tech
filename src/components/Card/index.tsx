import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardProps {
  icon: IconProp;
  title: string;
  subtitle: string;
}

export default function Card({ icon, title, subtitle }: CardProps) {
  return (
    <>
      <div className="w-[250px] h-[250px] rounded-4xl flex flex-col justify-center items-center p-2 border-2 border-[#5AAC38] dark:border-white ">
        <div className="text-center w-45">
          <FontAwesomeIcon icon={icon} size="5x" />
        </div>
        <div className="justify-center items-center">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-center ">{title}</h1>
        <p className="mb-3 font-bold  text-gray-700 text-justify dark:text-gray-300  ">{subtitle}</p>
        </div>
      </div>
    </>
  );
}
