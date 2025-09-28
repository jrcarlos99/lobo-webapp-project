import { LogoutForm } from "@/components/AppLogoutDialog";

export default function ExitPage() {
  return (
    <div>
      <LogoutForm isOpen={true} onClose={() => {}} />
    </div>
  );
}
