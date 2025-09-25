import { AppBarChart } from "@/components/AppBarChart";
import { AppDatePicker } from "@/components/AppDatePicker";
import { AppOcorrenciaChart } from "@/components/AppOcorrenciaChart";
import { ChartPieLabel } from "@/components/AppPieChart";
import { ChartPieDonut } from "@/components/AppPieChartDonut";
import { AppSelect } from "@/components/AppSelect";

const HEADER_HEIGHT = 69;

export default function HomePage() {
  return (
    <div
      style={{ minHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      className="min-h-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4 min-h-0 h-full">
        <div className="bg-primary-foreground p-4 rounded-lg h-full flex flex-col min-h-0 ">
          <AppDatePicker />
          <span className="font-inter text-6xl flex pt-2 font-medium text-[var(--color-text)]">
            Hoje
          </span>
          <AppSelect />

          <div className="flex-1 min-h-0 mt-4">
            <AppOcorrenciaChart />
          </div>
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-3 xl:col-span-2 2xl:col-span-3 h-full min-h-0">
          MAPA
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg h-full flex flex-col min-h-0">
          <div className="flex-1 min-h-0">
            <ChartPieDonut />
          </div>
        </div>

        <div className="bg-primary-foreground p-4 border rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2 h-full flex flex-col min-h-0">
          <div className="flex-1 min-h-">
            <AppBarChart />
          </div>
        </div>

        <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-1 h-full flex flex-col min-h-0">
          <div className="flex-1 min-h-">
            <ChartPieLabel />
          </div>
        </div>
      </div>
    </div>
  );
}
