import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme-toggler";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-primary hover:text-white hover:bg-primary" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 bg-primary"
        />
        <section className="flex space-x-10 ml-auto w-3xl">
          <div className="w-2xl flex justify-center gap-x-2 items-center rounded-sm border border-primary pl-2 text-background">
            <Search className="text-primary dark:text-white" />
            <Input
              placeholder="Search for a movie..."
              className="border-transparent focus-visible:border-0 focus-visible:ring-0 placeholder:font-bold placeholder:text-primary/50 dark:placeholder:text-white/50 rounded-sm text-primary"
            />
          </div>
          <div className="flex justify-center gap-x-5 items-center">
            <div className="hidden md:flex justify-center gap-x-5 items-center ">
              <Button className="dark:text-white">Sign Up</Button>
              <Button className="dark:text-white">Log In</Button>
            </div>
            <div className=" flex gap-5 items-center">
              <ThemeToggle />
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}
