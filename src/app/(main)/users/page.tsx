import { AppDatePicker } from "@/components/AppDatePicker";
import { InputWithButton } from "@/components/AppInputWithButton";
import { AppTableUsers } from "@/components/AppTableUsers";

export default function UsersPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <AppDatePicker />
        <span className="font-inter text-4xl sm:text-5xl lg:text-6xl flex pt-2 font-medium text-[var(--color-text)]">
          Usuários
        </span>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:flex-col items center gap-4">
        <InputWithButton />
      </div>
      <div className="bg-primary-foreground rounded-lg">
        <AppTableUsers />
      </div>
    </div>
  );
}
