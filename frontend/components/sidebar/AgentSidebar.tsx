import React from "react";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { AppSidebar } from "../AppSidebar";
const links = [
  {
    title: "Dashboard",
    url: "/agent",
    icon: Home,
  },
  {
    title: "Properties",
    url: "/agent/properties",
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

export default function AgentSidebar() {
  return (
    <>
      <AppSidebar items={links} />
    </>
  );
}
