import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PrismaClient } from "@/generated/prisma";

import planta1 from "../../../public/plants/1.jpg";
import planta2 from "../../../public/plants/2.jpg";
import planta3 from "../../../public/plants/3.jpg";
import planta4 from "../../../public/plants/4.jpg";
import plantaDefault from "../../../public/plants/default.jpg";

const plantImages: Record<number, StaticImageData> = {
  1: planta1,
  2: planta2,
  3: planta3,
  4: planta4,
  5: plantaDefault,
};

const prisma = new PrismaClient();
const plant = await prisma.planta.findMany();
interface ModalPlantsProps {
  userId: number;
}
export function ModalPlants({ userId }: ModalPlantsProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Escolher Planta</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>🌿 Escolha sua Planta</DialogTitle>
          <DialogDescription>
            Clique na planta que deseja monitorar.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {plant.map((plants) => (
            <form
              key={plants.id}
              method="POST"
              action="/api/userPlant"
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center"
            >
              <input type="hidden" name="idPlanta" value={plants.id} />
              <input type="hidden" name="userId" value={userId} />

              <div className="relative w-full h-[120px]">
                <Image
                  src={plantImages[plants.id] || plantaDefault}
                  alt={plants.nomeCientifico}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 w-full text-center">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  {plants.nomePopular}
                </h3>
                <Button
                  type="submit"
                  className="w-full text-white bg-green-600 hover:bg-green-700"
                >
                  Selecionar
                </Button>
              </div>
            </form>
          ))}
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
