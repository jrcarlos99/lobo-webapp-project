import { AppBarChart } from "@/components/AppBarChart";
import { AppDatePicker } from "@/components/AppDatePicker";
import { AppOcorrenciaChart } from "@/components/AppOcorrenciaChart";
import { ChartPieLabel } from "@/components/AppPieChart";
import { ChartPieDonut } from "@/components/AppPieChartDonut";
import { AppSelect } from "@/components/AppSelect";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg ">
        <AppDatePicker />
        <span className="font-inter text-6xl flex pt-2 font-medium text-[var(--color-text)]">
          Hoje
        </span>
        <AppSelect />
        <div className="bg-primary-foreground p-4 rounded-lg flex flex-col lg:col-span-1 xl:col-span-1 2xl:col-span-1">
          <AppOcorrenciaChart />
        </div>
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-3 xl:col-span-2 2xl:col-span-3">
        MAPA
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg">
        <ChartPieDonut />
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div>

      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-1">
        <ChartPieLabel />
      </div>
    </div>
  );
}
