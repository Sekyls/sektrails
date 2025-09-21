"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { useAuth } from "@/providers/firebase-auth-provider";

export function NavUser() {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="flex items-center gap-x-3">
        <Avatar className="size-9 rounded-full bg-primary">
          <AvatarImage src="/user.png" alt="Guest" />
          <AvatarFallback className="rounded-lg">G</AvatarFallback>
        </Avatar>
        <span className="truncate font-medium">Guest</span>
      </div>
    );
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex gap-3">
        <Avatar className="size-9 rounded-full bg-primary hover:scale-105 transition-all duration-300 ease-in-out">
          <AvatarImage
            src={user.photoURL ?? undefined}
            alt={user.displayName ?? "User"}
          />
          <AvatarFallback className="rounded-lg">
            {user.displayName!.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight space-y-1">
          <span className="truncate font-medium">{user.displayName}</span>
          <span className="text-muted-foreground truncate text-xs">
            {user.email}
          </span>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
