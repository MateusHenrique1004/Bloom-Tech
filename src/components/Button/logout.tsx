"use client";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <div className="flex flex-row-reverse ">
      <button
        className="w-20 p-2 bg-green-500 cursor-pointer rounded-full"
        onClick={() => signOut()}
      >
        SAIR
      </button>
    </div>
  );
}
