import Image from "next/image";
import { GridContainer } from "../gridContainer";
import Link from "next/link";
import { Toggle } from "../Theme/toggle";
export function Header() {
  return (
    <header className=" bg-white border-b-2 border-[#5AAC38] sticky top-0 w-full  h-[80px] z-50 flex  items-center dark:bg-black ">
      <GridContainer className="flex justify-between items-center">
        <div className=" flex items-center gap-2">
          <Image
            className="rounded-full"
            src={"/logo.png"}
            width={90}
            height={90}
            alt="Logo"
          />
          <h1 className="text-[#5AAC38] dark:text-white font-bold">
            Bloom Tech
          </h1>
        </div>

        {/* <div className="bg-slate-900 w-64 h-8 flex items-center gap-5 rounded-2xl border-transparent ">
          <Image
            className="ml-3"
            src={"/search.png"}
            width={15}
            height={10}
            alt="Search"
          />
          <input
            type="text"
            className="bg-transparent ml-2 border-none text-white overflow-ellipsis whitespace-nowrap outline-none overflow-hidden"
          />
        </div> */}
        <nav className="text-[#5AAC38] font-bold flex items-center p-2 space-x-3 dark:text-white  ">
          <Link className="" href={"/"}>
            Home
          </Link>
          <div className="">Plantas</div>
          <div className="">Sobre Nós</div>
        </nav>

        <nav className="text-blue-50 flex items-center mr-4 space-x-3">
          <Link
            className="bg-[#5AAC38] hover:bg-[#3c7225] text-white font-bold py-2 px-4 rounded"
            href={"/register"}
          >
            Cadastrar
          </Link>
          <Link
            className="bg-[#5AAC38] hover:bg-[#3c7225] text-white font-bold py-2 px-4 rounded"
            href={"/login"}
          >
            Login
          </Link>
          <Toggle />
        </nav>
      </GridContainer>
    </header>
  );
}
