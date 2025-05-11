import Image from "next/image";
import { GridContainer } from "../gridContainer";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faXTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer()
{
return (
<>
 <footer className="w-full bg-black mt-20 ">
<GridContainer className="flex items-center justify-between h-[119px]">

    <div className=" flex items-center gap-2">
          <Image
            className="rounded-full"
            src={"/logo.png"}
            width={90}
            height={90}
            alt="Logo"
          />
          <h1 className="text-white font-bold">Bloom Tech</h1>
        </div>

        <nav className="text-blue-50 flex items-center p-2 space-x-3 ">
          <Link className="" href={"/"}>
            Help
          </Link>
          <div>Contato</div>
          <div>Privacidade & Termos</div>
        </nav>

        <nav className="text-blue-50 flex items-center p-2 space-x-3 ">
         <FontAwesomeIcon className="hover:scale-100" icon={faInstagram} size="2x"/>  
          <FontAwesomeIcon icon={faXTwitter} size="2x"/>
          <FontAwesomeIcon icon={faLinkedin} size="2x"/>
        </nav>
</GridContainer>
 </footer>




</>


)

}