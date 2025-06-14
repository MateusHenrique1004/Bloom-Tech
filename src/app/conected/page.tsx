"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { ModalRegisterVase } from "@/components/Modal/registerPlant";

export default function ResetPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  const handleSuccess = () => {
    console.log("Redirecionando...");
    router.push("/dashbord");
  };

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);

    if (!open) {
      router.back();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  backdrop-blur-sm bg-[url('/fundo2.jpg')]">
      <ModalRegisterVase
        open={isModalOpen}
        onOpenChange={handleOpenChange}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
