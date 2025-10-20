"use client";
import { AppMapa } from "@/components/AppMapa";
import { Occurrence } from "@/types/occurrence";

type Props = {
  occurrences: Occurrence[];
};

export default function DashboardMap({ occurrences }: Props) {
  return (
    <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-3 xl:col-span-2 2xl:col-span-3 h-full min-h-0">
      <AppMapa occurrences={occurrences} />
    </div>
  );
}
