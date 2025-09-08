"use client";
import { LogIn, Menu, Search, User, UserRoundPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Command, CommandInput, CommandSeparator } from "./ui/custom-command";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggler";
import { useState } from "react";
import { MobileToggleProps } from "@/lib/types";

const NavigationDesktop = ({ isOpen, setIsOpen }: MobileToggleProps) => {
  return (
    <section className="flex justify-between p-5 gap-x-10 items-center md:grid grid-cols-3 md:justify-start md:gap-x-0 z-50">
      <div>
        <Link href={"/"}>
          {" "}
          <Image
            src={"/logos/sekflix.png"}
            width={150}
            height={103}
            alt="Sekflix logo"
            className="mx-auto scale-70 sm:scale-100"
          />
        </Link>
      </div>
      <div className="hidden md:flex justify-center gap-x-2 items-center rounded-sm border border-input pl-2 search-input text-background">
        <Search className="text-primary" />
        <Input
          placeholder="Search for a movie..."
          className="border-transparent focus-visible:border-0 focus-visible:ring-0 placeholder:font-bold placeholder:text-foreground rounded-sm text-primary"
        />
      </div>
      <div className="flex justify-center gap-x-5 items-center">
        <div className="hidden md:flex justify-center gap-x-5 items-center">
          <Button>Sign Up</Button>
          <Button>Log In</Button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
        <div className=" flex gap-5 items-center">
          <ThemeToggle />
          <Menu
            size={30}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className={cn(
              "md:hidden",
              isOpen === false ? "text-primary" : "text-red-300"
            )}
          />
        </div>
      </div>
    </section>
  );
};

const NavigationMobile = ({ isOpen }: MobileToggleProps) => {
  return (
    <section
      className={cn(
        "overflow-hidden absolute top-19 transition-all ease-in-out duration-1000 -z-40 navBar md:hidden w-full",
        isOpen === false ? "max-h-0 opacity-0" : "max-h-96 opacity-100"
      )}
    >
      <Command className="bg-transparent rounded-b-lg border-b border-b-gray-400/85 px-5 pb-5 space-y-3">
        <CommandInput
          placeholder="Search for a movie..."
          className="placeholder:font-medium"
        />
        <CommandSeparator />
        <div className="space-y-2 text-primary">
          <Link href={""} className="p-0 flex gap-1 items-center">
            <span className="text-foreground"> Sign Up</span>{" "}
            <UserRoundPlus size={18} />
          </Link>
          <CommandSeparator />
          <Link href={""} className="p-0 flex gap-1 items-center">
            Log In
            <LogIn size={18} className="text-foreground" />
          </Link>
          <CommandSeparator />
          <Link href={""} className="p-0 flex items-center gap-1">
            <span className="text-foreground">Profile</span>
            <User size={18} className="text-primary" />
          </Link>
        </div>
      </Command>
    </section>
  );
};

export default function NavigationBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className="fixed w-full top-0 navBar z-50">
      <NavigationDesktop isOpen={isOpen} setIsOpen={setIsOpen} />
      <NavigationMobile isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
}
