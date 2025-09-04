"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileDropDown() {
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src="/assets/profile-default-image.png"
          alt="profile"
          width={45}
          height={45}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56 mr-2">
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <button
            onClick={() => {
              signOut({ redirect: false });
              router.replace("/auth/agent/login");
            }}
            className=" flex items-center gap-x-1.5"
          >
            <LogOut size={20} /> Sign out
          </button>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
