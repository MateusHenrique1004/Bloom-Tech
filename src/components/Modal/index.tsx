import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import Image, { StaticImageData } from "next/image";

interface ModalComponentProps {
  image: StaticImageData;
  title: string;
  description: string;
}

export default function ModalComponent({
  image,
  title,
  description,
}: ModalComponentProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className=" bg-transparent cursor-pointer rounded-full p-0 overflow-hidden h-auto"
        >
          <Image
            src={image}
            width={100}
            height={100}
            alt="sensor"
            className="block"
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
