import React from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { AppSidebar } from "../AppSidebar";
const links = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  return (
    <>
      <AppSidebar items={links} />
    </>
  );
}
