"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "./input";

function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

function CommandInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const router = useRouter();
  const [search, setSearch] = React.useState<string>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/specialties/search?query=${search}`);
      }}
      data-slot="command-input-wrapper"
      className="flex items-center gap-2 border rounded-md shadow bg-gray-300/20 pl-2"
    >
      <SearchIcon
        onClick={(e) => {
          e.preventDefault();
          router.push(`/specialties/search?query=${search}`);
        }}
        type="submit"
        className="size-4 shrink-0 text-primary"
      />
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        autoComplete="on"
        data-slot="command-input"
        className={cn(
          "placeholder:text-muted-foreground flex w-full rounded-md bg-transparent text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-0 focus-visible:ring-0 border-0 text-primary",
          className
        )}
        {...props}
      />
    </form>
  );
}

function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("bg-border -mx-1 h-px", className)}
      {...props}
    />
  );
}

export { Command, CommandInput, CommandSeparator };
