"use client";
import { AppBarChart } from "@/components/AppBarChart";
import { ChartPieDonut } from "@/components/AppPieChartDonut";
import { AppPieChartTurno } from "@/components/AppPieChartTurno";
import { DashboardData } from "@/types/dashboard";

type Props = {
  dashboardData?: DashboardData;
  isLoading: boolean;
};

export default function DashboardCharts({ dashboardData, isLoading }: Props) {
  return (
    <>
      {/* Por Regiao */}
      <div className="bg-primary-foreground p-4 rounded-lg h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0">
          <ChartPieDonut data={dashboardData} isLoading={isLoading} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-primary-foreground p-4 border rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2 h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0">
          <AppBarChart data={dashboardData} isLoading={isLoading} />
        </div>
      </div>

      {/* Pie Chart por Turno */}
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-1 h-full flex flex-col min-h-0">
        <div className="flex-1 min-h-0">
          <AppPieChartTurno data={dashboardData} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}
