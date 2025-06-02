import Logout from "@/components/Button/logout";
import UseAnimationFrame from "@/components/Charts/object";
import Fc from "../../../public/vase/fc-28.png";
import { PieCharts } from "@/components/Charts/pizza";
import { Radius } from "@/components/Charts/radius";
import ModalComponent from "@/components/Modal";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashbord() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }
  return (
    <>
      <h1>Hello {session.user?.name}</h1>
      <Logout />
      <Link href={"/profile"} className="bg-red-500 p-8 w-full h-12">
        {" "}
        Imagem perfil
      </Link>
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
