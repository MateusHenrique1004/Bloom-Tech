"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faUserEdit,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "next-auth/react";
import Link from "next/link";

export function SettingsDrop() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="p-2 rounded-full bg-[#5AAC38] hover:bg-gray-300 border-none"
        >
          <FontAwesomeIcon icon={faCog} className="text-xl text-black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Configurações</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faUserEdit} className="text-sm" />
              <span>Editar Perfil</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem
            onClick={() => signOut()}
            className="flex items-center space-x-2 text-red-600 hover:bg-red-100"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-sm" />
            <span>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
