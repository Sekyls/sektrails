"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggler";
import { useParams } from "next/navigation";
import { useAuth } from "@/providers/firebase-auth-provider";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const router = useRouter();
  const { loading, user } = useAuth();

  const { categories } = useParams<{
    categories: [resourceType: string, resourcecategory: string];
  }>();
  const title =
    categories[1].replaceAll("_", " ") +
    " " +
    categories[0].replace("tv", "show") +
    "s";
  const pageTitle = title
    .replaceAll("all trendings", "trending this week")
    .toLocaleUpperCase();

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) pb-3 pt-1.5">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-primary hover:text-white hover:bg-primary" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 bg-primary"
        />
        <h5 className="text-primary font-bold tracking-widest font-dancingScript!">
          {pageTitle || "Sektrails"}
        </h5>
        <section className="flex space-x-5 ml-auto max-w-3xl items-center">
          <div className="flex justify-center gap-x-2 items-center rounded-sm border border-primary pl-2 text-background w-3xl">
            <Search className="text-primary dark:text-white" />
            <Input
              placeholder="Search for a movie..."
              className="border-transparent focus-visible:border-0 focus-visible:ring-0 placeholder:font-bold placeholder:text-primary/50 dark:placeholder:text-white/50 rounded-sm text-primary"
            />
          </div>
          <Button
            className={cn(
              loading || user
                ? "hidden"
                : "dark:text-white hover:scale-105 hover:bg-primary/70"
            )}
            size={"lg"}
            onClick={() => {
              router.replace("/auth/login");
            }}
          >
            Log In
          </Button>
          <Button
            className={cn(
              !user
                ? "hidden"
                : "dark:text-white hover:scale-105 hover:bg-primary/70"
            )}
            size={"lg"}
            onClick={() => {
              router.replace("");
            }}
          >
            Sign out
          </Button>
          <ThemeToggle />
        </section>
      </div>
    </header>
  );
}
