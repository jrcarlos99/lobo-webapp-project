"use client";
import dynamic from "next/dynamic";
import { Occurrence } from "@/types/occurrence";

const AppMapa = dynamic(() => import("@/components/AppMapa"), { ssr: false });

type Props = {
  occurrences: Occurrence[];
};

export default function DashboardMap({ occurrences }: Props) {
  return (
    <div className="w-full bg-primary-foreground p-4 rounded-lg lg:col-span-3 xl:col-span-3 2xl:col-span-3 h-full min-h-0">
      <AppMapa occurrences={occurrences} />
    </div>
  );
}
