"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { ModalReset } from "@/components/Modal/reset";

export default function ResetPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  const handleSuccess = () => {
    console.log("Solicitação de redefinição enviada. Redirecionando...");
    router.push("/");
  };

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);

    if (!open) {
      router.back();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  backdrop-blur-sm bg-[url('/fundo2.jpg')]">
      <ModalReset
        open={isModalOpen}
        onOpenChange={handleOpenChange}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
