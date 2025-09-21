"use client";
import { Menu, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Command, CommandInput } from "./ui/custom-command";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggler";
import { useState } from "react";
import { MobileNavProps, NavProps } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/firebase-auth-provider";
import UserAvatar from "./user-avatar";

const NavigationMenu = ({ isOpen, setIsOpen, user, loading }: NavProps) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>();

  return (
    <>
      <section className="flex justify-between mx-5 my-2 md:mx-0 md:my-0 md:p-5 sm:gap-x-10 items-center md:grid grid-cols-3 md:justify-start md:gap-x-0 z-50">
        <Link
          href={"/"}
          className="font-leckerli text-4xl hover-underline text-primary"
        >
          Sektrails
        </Link>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/specialties/search?query=${search}`);
          }}
          className="hidden md:flex justify-center gap-x-2 items-center rounded-sm border border-input pl-2 search-input text-background"
        >
          <Search
            className="text-primary hover:text-green-500"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/specialties/search?query=${search}`);
            }}
          />
          <Input
            placeholder="Search for a movie..."
            className="border-transparent focus-visible:border-0 focus-visible:ring-0 placeholder:font-bold placeholder:text-foreground rounded-sm text-primary"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            autoComplete="on"
          />
        </form>
        <div className="flex justify-center gap-x-5 items-center">
          <UserAvatar
            user={user}
            loading={loading}
            className="hidden md:block"
          />
          <div className=" flex gap-5 items-center">
            <ThemeToggle className="hidden md:flex" />
            <Menu
              size={30}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className={cn(
                "md:hidden relative",
                isOpen === false ? "text-primary" : "text-red-300"
              )}
            />

            <Button
              className="text-foreground tracking-wider text-lg rounded-sm hover:bg-primary/50 font-dancingScript hidden md:block"
              onClick={() => {
                router.replace("/specialties/movie/popular");
              }}
            >
              Specials
            </Button>
          </div>
        </div>
      </section>
      <NavigationMobile
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
        loading={loading}
      />
    </>
  );
};

const NavigationMobile = ({ isOpen, user, loading }: MobileNavProps) => {
  const router = useRouter();

  return (
    <section
      className={cn(
        "overflow-hidden transition-all ease-in-out duration-1000 -z-40 mx-5",
        isOpen === false
          ? "max-h-0 opacity-0"
          : "max-h-96 opacity-100 backdrop-blur-2xl rounded-md"
      )}
    >
      <Command className="bg-transparent rounded-lg space-y-3 pb-2">
        <CommandInput
          placeholder="Search for a movie..."
          className="placeholder:font-medium"
        />
        <div className="flex gap-5 pl-2">
          <UserAvatar
            user={user}
            loading={loading}
            align="start"
            sideOffset={5}
            className="md:hidden"
          />
          <Button
            className="text-white tracking-wider text-lg rounded-sm hover:bg-primary/50 font-dancingScript md:hidden"
            onClick={() => {
              router.replace("/specialties/movie/popular");
            }}
          >
            Specials
          </Button>
          <ThemeToggle className="md:hidden" />
        </div>
      </Command>
    </section>
  );
};

export default function NavigationBar() {
  const { loading, user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className="fixed w-full top-0 navBar z-50">
      <NavigationMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
        loading={loading}
      />
    </nav>
  );
}
