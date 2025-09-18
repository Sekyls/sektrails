"use client";
import { LogIn, Menu, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Command, CommandInput, CommandSeparator } from "./ui/custom-command";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggler";
import { useState } from "react";
import { MobileToggleProps, NavProps } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/firebase-auth-provider";
import UserAvatar from "./user-avatar";

const NavigationDesktop = ({ isOpen, setIsOpen, user, loading }: NavProps) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>();

  return (
    <section className="flex justify-between p-5 gap-x-10 items-center md:grid grid-cols-3 md:justify-start md:gap-x-0 z-50">
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
        <div className="flex justify-center gap-x-5 items-center">
          <Button
            className={cn(
              loading || user
                ? "hidden"
                : "dark:text-white hover:scale-105 hover:bg-primary/70"
            )}
            size={"lg"}
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Log In
          </Button>
          <UserAvatar user={user} />
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
          <Button
            className="text-foreground tracking-wider text-lg rounded-sm hover:bg-primary/50 font-dancingScript"
            onClick={() => {
              router.replace("/specialties/movie/popular");
            }}
          >
            Specials
          </Button>
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
          <Link href={"/auth/login"} className="p-0 flex gap-1 items-center">
            Log In
            <LogIn size={18} className="text-foreground" />
          </Link>
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
      <NavigationDesktop
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
        loading={loading}
      />
      <NavigationMobile isOpen={isOpen} setIsOpen={setIsOpen} />
    </nav>
  );
}
