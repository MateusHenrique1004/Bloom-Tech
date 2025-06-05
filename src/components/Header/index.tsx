"use client";

import Image from "next/image";
import { GridContainer } from "../gridContainer";
import Link from "next/link";
import { Toggle } from "../Theme/toggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-black border-b-2 border-[#5AAC38] sticky top-0 w-full h-[80px] z-50">
      <GridContainer className="flex justify-between items-center h-full px-4 md:px-8">
        {/* Logo e nome */}
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            src="/logo.png"
            width={60}
            height={60}
            alt="Logo"
          />
          <h1 className="text-[#5AAC38] dark:text-white font-bold text-lg md:text-2xl">
            Bloom Tech
          </h1>
        </div>

        {/* Botão menu mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded text-[#5AAC38] hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            aria-label="Abrir menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Navegação principal (desktop) */}
        <nav className="hidden md:flex items-center space-x-4 font-bold text-[#5AAC38] dark:text-white">
          <Link href="/">Home</Link>
          <Link href="/">Plantas</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/us">Sobre Nós</Link>
        </nav>

        {/* Botões e toggle (desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/register"
            className="bg-[#5AAC38] hover:bg-[#3c7225] text-white font-bold py-1 px-3 rounded text-sm transition"
          >
            Cadastrar
          </Link>
          <Link
            href="/login"
            className="bg-[#5AAC38] hover:bg-[#3c7225] text-white font-bold py-1 px-3 rounded text-sm transition"
          >
            Login
          </Link>
          <Toggle />
        </div>
      </GridContainer>

      {/* Navegação mobile (dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t border-[#5AAC38] px-4 pb-4 flex justify-center">
          <nav className="flex flex-col items-center gap-2 text-[#5AAC38] dark:text-white font-bold pt-4">
            <Link href="/">Home</Link>
            <Link href="/">Plantas</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/us">Sobre Nós</Link>
            <Link
              href="/register"
              className="bg-[#5AAC38] hover:bg-[#3c7225] text-white font-bold py-2 px-4 rounded text-center transition"
            >
              Cadastrar
            </Link>
            <Link
              href="/login"
              className="bg-[#5AAC38] hover:bg-[#3c7225] text-white font-bold py-2 px-4 rounded text-center transition"
            >
              Login
            </Link>
            <div className="mt-2 flex justify-end">
              <Toggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
