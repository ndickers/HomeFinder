import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileDropDown } from "../../../components/ProfileDropDown";
import AgentSidebar from "@/components/sidebar/AgentSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AgentSidebar />
      <main className="w-full">
        <div className="w-full px-2 md:px-4 flex items-center justify-between py-2">
          <SidebarTrigger />
          <ProfileDropDown />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
