"use client";

import { DashboardData } from "@/types/dashboard";
import dynamic from "next/dynamic";

const ChartPieDonut = dynamic(() => import("@/components/AppPieChartDonut"), {
  ssr: false,
});
const AppBarChart = dynamic(() => import("@/components/AppBarChart"), {
  ssr: false,
});
const AppPieChartTurno = dynamic(
  () => import("@/components/AppPieChartTurno"),
  { ssr: false }
);

type Props = {
  dashboardData?: DashboardData;
  isLoading: boolean;
};

export default function DashboardCharts({ dashboardData, isLoading }: Props) {
  console.log("DashboardData recebido:", dashboardData);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {/* Por Regiao */}
        <div className="p-2 flex flex-col overflow-hidden">
          <ChartPieDonut
            data={dashboardData?.porRegiao}
            isLoading={isLoading}
          />
        </div>

        {/* Bar Chart */}
        <div className=" p-2 flex flex-col overflow-hidden">
          <AppBarChart data={dashboardData?.porTipo} isLoading={isLoading} />
        </div>

        {/* Pie Chart por Turno */}
        <div className=" p-2 flex flex-col overflow-hidden">
          <AppPieChartTurno
            data={dashboardData?.porTurno}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
