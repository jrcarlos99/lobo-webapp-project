import HeaderPage from "@/components/AppHeader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderPage />
      <main className="flex-1 min-h-0 overflow-auto">{children}</main>
    </div>
  );
}
