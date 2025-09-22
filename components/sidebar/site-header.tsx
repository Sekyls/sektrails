"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggler";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/firebase-auth-provider";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getPageTitle } from "@/lib/page-title";

export function SiteHeader() {
  const router = useRouter();
  const { loading, user } = useAuth();
  const pathname = usePathname();
  const [pageTitle, setPageTitle] = useState<string>();
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    const pageTitle = getPageTitle(pathname);
    setPageTitle(pageTitle.toLocaleUpperCase());
  }, [pathname]);

  return (
    <header className="grid grid-cols-[1fr_2fr] h-(--header-height) items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      {/* First Column */}
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-primary hover:text-white hover:bg-primary" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 bg-primary"
        />
        <h6 className="text-primary max-[698px]:text-xs! font-bold tracking-widest font-dancingScript! w-full text-nowrap">
          {pageTitle}
        </h6>
      </div>

      <section className="flex mr-2 sm:mr-0 sm:space-x-5 items-center ml-auto max-[314px]:hidden">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/specialties/search?query=${search}`);
          }}
          className="flex justify-center gap-x-1 sm:gap-x-2 items-center rounded-md sm:rounded-sm border border-primary/55 pl-2 text-background"
        >
          <Search
            onClick={(e) => {
              e.preventDefault();
              router.push(`/specialties/search?query=${search}`);
            }}
            type="submit"
            className="text-primary dark:text-white hover:fill-primary! size-5"
          />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            autoComplete="on"
            placeholder="Search..."
            className="border-transparent focus-visible:border-0 focus-visible:ring-0 sm:placeholder:font-bold placeholder:text-primary/50 dark:placeholder:text-white/50 rounded-sm text-primary text-sm sm:text-base"
          />
        </form>
        <Button
          className={cn(
            loading || user
              ? "hidden"
              : "dark:text-white hover:scale-105 hover:bg-primary/70 hidden sm:flex"
          )}
          size={"lg"}
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          Log In
        </Button>
        <Button
          className={cn(
            !user
              ? "hidden"
              : "dark:text-white hover:scale-105 hover:bg-primary/70 hidden sm:flex"
          )}
          size={"lg"}
          onClick={() => {
            router.replace("");
          }}
        >
          Sign out
        </Button>
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>
      </section>
    </header>
  );
}
