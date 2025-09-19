import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSideBar";
import { Navbar } from "@/components/Navbar";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-h-screen min-w-0">
          <Navbar />
          <main className="flex-1 px-6 w-full">
            <div className="flex-1 overflow-auto px-6 w-full">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
