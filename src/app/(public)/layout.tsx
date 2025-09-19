import HeaderPage from "@/components/AppHeader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HeaderPage />
      {children}
    </div>
  );
}
