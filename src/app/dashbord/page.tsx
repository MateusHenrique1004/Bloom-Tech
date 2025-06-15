"use server";

import Fc from "../../../public/sensors/fc-28.png";
import Bomba from "../../../public/sensors/bombAgua.png";
import Esp from "../../../public/sensors/esp-32.png";
import Dht from "../../../public/sensors/dht11.png";
import Rele from "../../../public/sensors/rele.png";
import planta from "../../../public/plants/1.jpg";

import ModalComponent from "@/components/Modal";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ChartArea } from "@/components/Charts/area";
import { ChartBar } from "@/components/Charts/bar";
import { ChartLine } from "@/components/Charts/line";
import CarouselPlants from "@/components/Carroussel/plant";
import { PrismaClient } from "@/generated/prisma";
import { ModalPlants } from "@/components/Modal/registerPlant";
import { ModalRegisterVase } from "@/components/Modal/registerVase";
import { SettingsDrop } from "@/components/Button/settingsDrop";
import Image from "next/image";

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

  const leituras = await prisma.leituras.findMany({
    where: {
      sensorVaso: {
        vaso: {
          idUser: user.id,
        },
        sensor: {
          idTipoSensor: 2,
        },
      },
    },
    orderBy: {
      datetime: "asc",
    },
    select: {
      datetime: true,
      umidade: true,
      temperatura: true,
    },
  });

  const umidadeDHT11Data = leituras.map((leitura) => ({
    month: leitura.datetime.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    }),
    umidade: leitura.umidade ?? 0,
    ideal: 99,
  }));

  const temperaturaDHT11Data = leituras.map((leitura) => ({
    month: leitura.datetime.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    }),
    medida: leitura.temperatura ?? 0,
    ideal: 25,
  }));

  const leiturasSolo = await prisma.leituras.findMany({
    where: {
      sensorVaso: {
        vaso: {
          idUser: user.id,
        },
        sensor: {
          idTipoSensor: 1,
        },
      },
    },
    orderBy: {
      datetime: "asc",
    },
    select: {
      datetime: true,
      umidade: true,
    },
  });

  const umidadeSoloData = leiturasSolo.map((leitura) => ({
    month: leitura.datetime.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    }),
    medida: leitura.umidade ?? 0,
    ideal: 650, // Valor ideal para o FC-28
  }));

  if (!vaso) {
    //  User ainda não tem vaso
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
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
        <ModalRegisterVase
          trigger={
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Cadastrar vaso
            </Button>
          }
        />
        <CarouselPlants />

        <div className="absolute top-4 right-4">
          <SettingsDrop />
        </div>
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

  return (
    <>
      <div className="flex flex-row justify-between mt-2  ">
        <div></div>
        <h1 className="text-center text-[#3c7225] text-4xl">
          Olá {session.user?.name}
        </h1>

        <SettingsDrop />
      </div>

      <div className="flex flex-col m-20">
        <div className="flex flex-row justify-center items-center space-x-20">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-3xl text-[#5AAC38]">Sua Plantinha</h1>
            <Image src={planta} width={300} height={300} alt="" />
            <h1 className="text-3xl text-[#5AAC38]">Equipamentos do Vaso</h1>
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

          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl text-[#5AAC38] mb-5">
              Gráficos do seu Plantio
            </h1>
            <div className="flex flex-row space-x-7 justify-between">
              <ChartArea data={temperaturaDHT11Data} />
              <ChartLine data={umidadeDHT11Data} />

              <ChartBar data={umidadeSoloData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
