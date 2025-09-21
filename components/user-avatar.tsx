import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AvatarUser } from "@/lib/types";

import { IconLogout } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function UserAvatar({
  user,
  loading,
  className,
  align,
  sideOffset,
}: AvatarUser) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn("", className)}>
        {user ? (
          <Avatar className="size-9 rounded-full bg-primary hover:scale-105 transition-all duration-300 ease-in-out">
            <AvatarImage
              src={user.photoURL ?? undefined}
              alt={user.displayName ?? "User"}
            />
            <AvatarFallback className="rounded-lg">
              {user.displayName!.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar className="size-9 rounded-full bg-primary">
            <AvatarImage src="/user.png" alt="Guest" />
            <AvatarFallback className="rounded-lg">G</AvatarFallback>
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) rounded-lg px-3 py-1 space-y-1 border-0 bg-background/70"
        align={align}
        sideOffset={sideOffset}
      >
        {user ? (
          <>
            <DropdownMenuItem>
              <p>{user.displayName ?? "User"}</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <p>{user.email ?? ""}</p>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button className=" flex gap-x-2 w-full justify-center items-center text-foreground bg-red-700 hover:bg-red-400">
                Log out
                <IconLogout color="white" />
              </Button>
            </DropdownMenuItem>
          </>
        ) : (
          <Button
            variant={"link"}
            className={cn(
              loading || user
                ? "hidden"
                : "dark:text-white hover:scale-105 w-full hover:bg-transparent hover:no-underline hover:text-primary dark:hover:text-primary text-base"
            )}
            size={"lg"}
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Log In
          </Button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
