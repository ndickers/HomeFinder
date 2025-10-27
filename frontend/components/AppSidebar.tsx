import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronDown } from "lucide-react";

export function AppSidebar({ items }: any) {
  return (
    <Sidebar className="w-64 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item: any) =>
                item.children ? (
                  // 🌟 Collapsible Group
                  <Collapsible key={item.title} className="group/collapsible">
                    <SidebarGroupLabel asChild>
                      <CollapsibleTrigger
                        className="flex w-full items-center justify-between px-3 py-2 rounded-md 
                                   hover:bg-gray-100 dark:hover:bg-gray-800 
                                   hover:text-gray-900 dark:hover:text-white transition"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        <ChevronDown
                          className="h-4 w-4 text-gray-600 dark:text-gray-400 
                                                  transition-transform group-data-[state=open]/collapsible:rotate-180"
                        />
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>

                    <CollapsibleContent>
                      <SidebarGroupContent className="ml-4 mt-1 space-y-1">
                        {item.children.map((child: any) => (
                          <SidebarMenuItem key={child.title}>
                            <SidebarMenuButton asChild>
                              <Link
                                href={child.url}
                                className="flex items-center gap-2 px-2 py-1 rounded 
                                           text-gray-600 dark:text-gray-400 
                                           hover:bg-gray-100 dark:hover:bg-gray-800 
                                           hover:text-gray-900 dark:hover:text-white transition"
                              >
                                <child.icon className="w-4 h-4" />
                                <span>{child.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  // 🔗 Regular Link
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center gap-2 px-3 py-2 rounded-md
                                   text-gray-900 dark:text-gray-200
                                   hover:bg-gray-100 dark:hover:bg-gray-800 
                                   hover:text-gray-900 dark:hover:text-white transition"
                      >
                        <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
