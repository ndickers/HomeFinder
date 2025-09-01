import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileDropDown } from "../../../components/ProfileDropDown";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
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
