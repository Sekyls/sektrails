"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { SideBarCategoriesProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function NavMain({ items }: { items: SideBarCategoriesProps }) {
  const router = useRouter();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Categories"
              className="bg-primary min-w-8 hover:bg-primary  flex justify-center text-white font-bold"
            >
              <h5 className="tracking-widest">Categories</h5>
              <Video className="rotate-130 scale-130" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((cat, index) => {
            return (
              <article key={index}>
                <h5 className="mt-5 pl-2 tracking-widest mb-2">
                  {cat.category.categoryName}
                </h5>
                {cat.category.subCategories.map((subcat, subindex) => {
                  return (
                    <SidebarMenuItem key={subindex} className={cn("mb-2")}>
                      <SidebarMenuButton
                        tooltip={subcat.title}
                        onClick={() => {
                          router.replace(subcat.url);
                        }}
                        className={cn(
                          "hover:bg-primary hover:text-white",
                        )}
                      >
                        {subcat.icon && <subcat.icon />}
                        <span>{subcat.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </article>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
