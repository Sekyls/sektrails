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

export default function UserAvatar({ user }: AvatarUser) {
  if (!user) {
    return (
      <Avatar className="size-9 rounded-full bg-primary">
        <AvatarImage src="/user.png" alt="Guest" />
        <AvatarFallback className="rounded-lg">G</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 rounded-full bg-primary hover:scale-105 transition-all duration-300 ease-in-out">
          <AvatarImage
            src={user.photoURL ?? undefined}
            alt={user.displayName ?? "User"}
          />
          <AvatarFallback className="rounded-lg">
            {user.displayName!.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg px-3 py-1 space-y-1 border-0 bg-background/60"
        align="center"
        sideOffset={15}
      >
        <DropdownMenuItem>
          <p>{user.displayName}</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <p>{user.email}</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button className=" flex gap-x-2 w-full justify-center items-center text-foreground bg-red-700 hover:bg-red-400">
            Log out
            <IconLogout color="white" />
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
