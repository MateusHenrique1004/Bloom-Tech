"use server";

import UseAnimationFrame from "@/components/Charts/object";
import Fc from "../../../public/sensors/fc-28.png";
import Bomba from "../../../public/sensors/bombAgua.png";
import Esp from "../../../public/sensors/esp-32.png";
import Dht from "../../../public/sensors/dht11.png";
import Rele from "../../../public/sensors/rele.png";
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
import CarouselPlants from "@/components/Carroussel/plant";
import { PrismaClient } from "@/generated/prisma";
import { ModalPlants } from "@/components/Modal/registerVase";

export default async function Dashboard() {
  const prisma = new PrismaClient();
  const session = await getServerSession();

  if (!session) redirect("/");

  const user = await prisma.usuario.findUnique({
    where: { email: session.user?.email },
    select: { id: true },
  });

  if (!user) throw new Error("Usuário não encontrado.");

  const vaso = await prisma.vaso.findFirst({
    where: { idUser: user.id },
    select: {
      id: true,
      plantios: {
        where: {
          dataFim: null, // Considera o plantio ativo
        },
        select: {
          id: true,
          idPlanta: true,
        },
      },
    },
  });

  if (!vaso) {
    //  User ainda não tem vaso
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-semibold text-[#3c7225] mb-4">
          Olá {session.user?.name}
        </h1>
        <p className="mb-6 text-center text-gray-700">
          Você ainda não possui o nosso vaso.
          <br />
          Que tal adquirir um agora?
        </p>
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Ir para a loja!
        </Button>
        <p className="mb-6 text-center text-gray-700 mt-6">
          Caso você já tenha comprado, clique aqui para cadastrar o seu vaso:
        </p>
        <ModalPlants userId={user.id} />
        <CarouselPlants />
      </div>
    );
  }
  //user tem vaso mas nao há planta
  if (vaso.plantios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl font-semibold text-[#3c7225] mb-4">
          Olá {session.user?.name}
        </h1>
        <p className="mb-6 text-center text-gray-700">
          Seu vaso está pronto, mas ainda falta escolher uma planta.
        </p>
        <ModalPlants userId={user.id} />
      </div>
    );
  }
  //dashboard
  return (
    <>
      <h1 className="text-center text-[#3c7225] text-4xl">
        Olá {session.user?.name}
      </h1>

      <div className="flex flex-col space-y-3">
        <Link href="/profile" className="w-32">
          <Button className="w-32 flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white">
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

      <div className="flex flex-col m-20">
        <div className="flex flex-row justify-center items-center space-x-20">
          <div className="flex flex-col items-center space-y-6">
            <UseAnimationFrame />
            <h1 className="text-3xl text-[#5AAC38]">Equipamentos</h1>
            <div className="flex flex-nowrap justify-center gap-6">
              <ModalComponent
                image={Fc}
                title="FC-28"
                description="Sensor de umidade do solo."
              />
              <ModalComponent
                image={Dht}
                title="DHT-11"
                description="Sensor de umidade/temperatura do ar."
              />
              <ModalComponent
                image={Rele}
                title="Rele 5v"
                description="Ativa a bomba de água."
              />
              <ModalComponent
                image={Esp}
                title="ESP-32"
                description="Microcontrolador do sistema."
              />
              <ModalComponent
                image={Bomba}
                title="Bomba d' Água"
                description="Atuador responsável pela irrigação."
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
