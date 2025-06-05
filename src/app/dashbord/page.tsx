import Logout from "@/components/Button/logout";
import UseAnimationFrame from "@/components/Charts/object";
import Fc from "../../../public/vase/fc-28.png";
import { PieCharts } from "@/components/Charts/pizza";
import { Radius } from "@/components/Charts/radius";
import ModalComponent from "@/components/Modal";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function Dashbord() {
  const session = await getServerSession();
  console.log("teste", session?.user);

  if (!session) {
    redirect("/");
  }
  return (
    <>
      <h1>Hello {session.user?.name}</h1>
      <Logout />
      <div className="flex flex-col space-y-3">
        <Link
          href={"/profile"}
          className="bg-red-500 p-4 w-4 h-4 rounded-xl "
        ></Link>
        <div className="space-x-5 ">
          <Link
            href={"/editPlanta"}
            className=" bg-amber-300 p-4 w-4 h-4 rounded-xl flex flex-row justify-center items-center "
          >
            <Image
              src={"/alecrim.jpg"}
              width={20}
              height={20}
              alt="imagem perfil"
            />
            <p className="text-base "> as</p>
          </Link>
        </div>
      </div>
      <div className=" flex flex-col m-20 ">
        <div className=" flex flex-row justify-center items-center space-x-20">
          <div className="">
            <UseAnimationFrame />
            <ModalComponent
              image={Fc}
              title="FC-28"
              description="O sensor FC-28 é um sensor de umidade do solo, que utiliza um método
            de medição eletromagnética para determinar a umidade do solo."
            />
            <ModalComponent
              image={Fc}
              title="FC-28"
              description="O sensor FC-28 é um sensor de umidade do solo, que utiliza um método
            de medição eletromagnética para determinar a umidade do solo."
            />
            <ModalComponent
              image={Fc}
              title="FC-28"
              description="O sensor FC-28 é um sensor de umidade do solo, que utiliza um método
            de medição eletromagnética para determinar a umidade do solo."
            />
          </div>

          <div className="flex flex-row justify-between">
            <div className="p-4 bg-black ">
              <Radius />
            </div>

            <div className="p-4 bg-black ">
              <Radius />
            </div>

            <div className="p-4 bg-black ">
              <PieCharts />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
