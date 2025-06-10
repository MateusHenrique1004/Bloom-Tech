"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchema, RegisterVaseVales } from "@/schemas/resetSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ModalResetProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ModalRegisterVase({
    
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  onSuccess,
}: ModalResetProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const router = useRouter();

  const isControlled =
    controlledOpen !== undefined && setControlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const onOpenChange = isControlled ? setControlledOpen : setInternalOpen;

  const form = useForm<RegisterVaseValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      numeroSerie: "",
    },
  });

  async function onSubmitReset(data: RegisterVaseValues) {
    try {
      const checkRes = await fetch(
        `/api/placas?numeroSerie=${data.numeroSerie}`
      );
      if (!checkRes.ok) {
        const err = await checkRes.json();
        throw new Error(err.error || "Número de série não encontrado no banco");
      }

      const res = await fetch("/api/vasos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numeroSerie: data.numeroSerie }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erro ao cadastrar vaso");
      }

      onOpenChange(false);
      form.reset();
      if (onSuccess) onSuccess();

      router.push(`/editPlanta?serial=${data.numeroSerie}`);
    } catch (err) {
      alert(err.message || "Erro desconhecido");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!isControlled && trigger && (
        <DialogTrigger asChild>{trigger}</DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Vaso</DialogTitle>
          <DialogDescription>
            Digite o número de série da sua placa
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="registerVase-form"
            onSubmit={form.handleSubmit(onSubmitReset)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="numeroSerie"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right col-span-1">
                    Nº Série
                  </FormLabel>
                  <FormControl className="col-span-3">
                    <Input
                      type="number"
                      placeholder="Número de série"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4 text-right" />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" form="registerVase-form">
                Confirmar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
