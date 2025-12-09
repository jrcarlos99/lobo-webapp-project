import { apiOcorrencias } from "@/lib/apiClientOcorrencias";

import type { DashboardData } from "@/types/dashboard";

export async function getDashboardData(
  dataInicio?: string,
  dataFim?: string
): Promise<DashboardData> {
  console.log("Chamando backend com: ", { dataInicio, dataFim });

  try {
    const response = await apiOcorrencias.get("/api/ocorrencias/dashboard", {
      params: { dataInicio, dataFim },
    });

    const raw = response.data;
    console.log("Resposta bruta do backend:", raw);

    const data: DashboardData = {
      totalOcorrencias: raw.totalOcorrencias ?? 0,
      porcentagemComparacaoPeriodo: raw.porcentagemComparacaoPeriodo ?? 0,
      porStatus: raw.porStatus ?? {},
      porTipo: raw.porTipo ?? {},
      porTurno: raw.porTurno ?? {},
      porRegiao: raw.porRegiao ?? {},
    };

    console.log("✅ DashboardData adaptado:", data);
    return data;
  } catch (err) {
    console.error("❌ Erro dentro do getDashboardData:", err);
    throw err;
  }
}
