"use client";
import { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSideBar";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth(); // loading adicionado
  const router = useRouter();
  const [defaultOpen, setDefaultOpen] = useState(true);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!loading) {
      const sidebarState = localStorage.getItem("sidebar_state");
      setDefaultOpen(sidebarState ? sidebarState === "true" : true);
    }
  }, [loading, isAuthenticated, router]);

  // ✅ Enquanto carrega, não redireciona
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Carregando...</span>
      </div>
    );
  }

  // ✅ Só mostra isso se loading terminou e não está autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Redirecionando...</span>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-h-screen min-w-0">
          <Navbar />
          <main className="flex-1 px-6 w-full">
            <div className="flex-1 w-full overflow-auto px-4 sm:px-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
