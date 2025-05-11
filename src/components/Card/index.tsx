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
      <div className="w-[250px] h-[250px] rounded-4xl ">
        <div className="text-center w-45">
          <FontAwesomeIcon icon={icon} size="5x" />
        </div>
        <div className="mb-2 text-2xl font-bold tracking-tight  ">{title}</div>
        <p className="mb-3 font-normal text-gray-700 ">{subtitle}</p>
      </div>
    </>
  );
}
