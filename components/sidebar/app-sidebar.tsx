"use client";
import * as React from "react";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavSecondary } from "@/components/sidebar/nav-secondary";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SIDEBAR_DATA } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/" className="hover:bg-transparent">
                <Image
                  src={"/logos/sektrails.png"}
                  width={150}
                  height={103}
                  alt="Sekflix logo"
                  className="scale-70 sm:scale-100"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SIDEBAR_DATA.mainCategories} />
        <NavSecondary items={SIDEBAR_DATA.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="mt-2">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
