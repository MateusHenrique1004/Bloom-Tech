"use client";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button className="w-full p-4 bg-green-500" onClick={() => signOut()}>
      SAIR
    </button>
  );
}
