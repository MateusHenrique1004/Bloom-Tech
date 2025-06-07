import UseAnimationFrame from "@/components/Charts/object";
import Fc from "../../../public/sensors/fc-28.png";
import Bomba from "../../../public/sensors/bombAgua.png";
import Esp from "../../../public/sensors/esp-32.png";
import Dht from "../../../public/sensors/dht11.png";
import Rele from "../../../public/sensors/rele.png";

import { PieCharts } from "@/components/Charts/pizza";
import { Radius } from "@/components/Charts/radius";
import ModalComponent from "@/components/Modal";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { ChartArea } from "@/components/Charts/area";
import { ChartBar } from "@/components/Charts/bar";
import { ChartLine } from "@/components/Charts/line";

export default async function Dashbord() {
  const session = await getServerSession();
  console.log("teste", session?.user);

  if (!session) {
    redirect("/");
  }
  return (
    <>
      <h1 className="text-center text-[#3c7225] text-4xl">
        Olá {session.user?.name}
      </h1>
      <div className="flex flex-col space-y-3 ">
        <Link href="/profile" className="w-32">
          <Button className="max-w-32 flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white">
            <FontAwesomeIcon icon={faUserEdit} className="text-sm" />
            <span>Editar Perfil</span>
          </Button>
        </Link>

        <Link href="/editPlanta" className="w-32">
          <Button className="w-32 flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white">
            <FontAwesomeIcon icon={faLeaf} className="text-sm" />
            <span>Editar Planta</span>
          </Button>
        </Link>
      </div>

      <div className=" flex flex-col m-20 ">
        <div className=" flex flex-row justify-center items-center space-x-20">
          <div className="flex flex-col items-center space-y-6 ">
            <UseAnimationFrame />{" "}
            <h1 className="text-3xl text-[#5AAC38]">Equipamentos</h1>
            <div className="flex flex-nowrap justify-center gap-6">
              <ModalComponent
                image={Fc}
                title="FC-28"
                description="O sensor FC-28 é um sensor de umidade do solo, que utiliza um método de medição eletromagnética para determinar a umidade do solo."
              />
              <ModalComponent
                image={Dht}
                title="DHT-11"
                description="O sensor DHT-11 é um sensor de umidade e Temperatura do ar."
              />
              <ModalComponent
                image={Rele}
                title="Rele 5v"
                description="O rele é o responsável por ativar a bomba da água, ele libera o circuito para trazer a água ao vaso."
              />
              <ModalComponent
                image={Esp}
                title="ESP-32"
                description="O ESP-32 é o microcontrolador responsável pela comunicação dos sensores com o meio. Com ele os dados são transferidos."
              />
              <ModalComponent
                image={Bomba}
                title="Mini Bomba d' Água"
                description="Mini Bomba D' Água é o atuador responsável por puxar a água e transferir para a mangueira regadora."
              />
            </div>
          </div>

          <div className="flex flex-row justify-between">
            <ChartArea />
            <ChartLine />
            <ChartBar />
          </div>
        </div>
      </div>
    </>
  );
}
