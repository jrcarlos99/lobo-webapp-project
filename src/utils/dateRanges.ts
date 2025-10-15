export function getPreviousRange(dataInicio: string, dataFim: string) {
  const start = new Date(dataInicio);
  const end = new Date(dataFim);

  const durationMs = end.getTime() - start.getTime();
  const prevEnd = new Date(start.getTime() - 1);
  const prevStart = new Date(prevEnd.getTime() - durationMs);

  return {
    dataInicioAnterior: prevStart.toISOString(),
    dataFimAnterior: prevEnd.toISOString(),
  };
}
