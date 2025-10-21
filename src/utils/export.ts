import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Occurrence } from "@/types/occurrence";

async function loadLogoBase64(): Promise<string> {
  const res = await fetch("/L.O.B.O.png");
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

export function handleGenerateReport(
  ocorrencias: Occurrence[],
  periodo: string
) {
  const doc = new jsPDF();

  // ====== CAPA ======
  doc.setFontSize(22);
  doc.text("Relatório Consolidado de Ocorrências", 105, 40, {
    align: "center",
  });

  doc.setFontSize(14);
  doc.text(`Período: ${periodo}`, 105, 55, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, 105, 65, {
    align: "center",
  });

  doc.addPage();

  // ====== INDICADORES OPERACIONAIS ======
  doc.setFontSize(16);
  doc.text("Indicadores Operacionais", 14, 20);

  doc.setFontSize(12);

  // Cálculo do tempo médio de operação
  const tempoOperacaoMedio =
    ocorrencias.reduce((acc, o) => {
      const inicio = new Date(o.dataHoraAbertura).getTime();
      const fim = new Date(o.dataHoraAtualizacao).getTime();
      return acc + (fim - inicio) / 60000;
    }, 0) / (ocorrencias.length || 1);

  doc.text("Tempo médio de resposta: -- min", 14, 30); // ainda não disponível
  doc.text(
    `Tempo médio de operação: ${tempoOperacaoMedio.toFixed(1)} min`,
    14,
    38
  );
  doc.text("Ocorrências com apoio externo: --", 14, 46); // ainda não disponível

  doc.addPage();

  // ====== TABELA DE OCORRÊNCIAS ======
  autoTable(doc, {
    head: [["ID", "Título", "Tipo", "Status", "Cidade", "Data Abertura"]],
    body: ocorrencias.map((o) => [
      o.id,
      o.titulo,
      o.tipo,
      o.status,
      o.cidade,
      new Date(o.dataHoraAbertura).toLocaleString("pt-BR"),
    ]),
    startY: 20,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [200, 0, 0] },
  });

  // ====== RODAPÉ EM TODAS AS PÁGINAS ======
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Gerado em ${new Date().toLocaleDateString(
        "pt-BR"
      )} - Página ${i} de ${pageCount}`,
      105,
      290,
      { align: "center" }
    );
  }

  // Salvar PDF
  doc.save("relatorio-ocorrencias.pdf");
}
export async function exportFormularioIndividual(
  titulo: string,
  formData: Record<string, string | number | boolean | null | undefined>,
  options: {
    color: [number, number, number];
    fields: { key: string; label: string }[];
  }
) {
  const doc = new jsPDF();
  const logoBase64 = await loadLogoBase64();

  // Cabeçalho
  doc.setFillColor(0, 70, 148);
  doc.rect(0, 0, 210, 20, "F");

  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", 10, 2, 16, 16);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text("Corpo de Bombeiros Militar de Pernambuco", 105, 12, {
    align: "center",
  });

  // Subtítulo com o nome do formulário
  doc.setTextColor(240, 240, 240);
  doc.setFontSize(12);
  doc.text(titulo, 105, 18, { align: "center" });

  // Conteúdo do formulário
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);

  let y = 35;
  options.fields.forEach(({ key, label }) => {
    const value = formData[key] ?? "";
    doc.text(`${label}: ${value}`, 14, y);
    y += 8;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  // Rodapé
  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.text(
    `Gerado em ${new Date().toLocaleDateString("pt-BR")}`,
    14,
    pageHeight - 10
  );

  doc.save(`${titulo}.pdf`);
}

export function exportToCSV(occurrences: Occurrence[]) {
  const header = ["ID", "Titulo", "Cidade", "Região", "Data", "Status"];
  const row = occurrences.map((o) => [
    o.id,
    o.titulo,
    o.cidade,
    o.regiao,
    o.status,
    new Date(o.dataHoraAbertura).toLocaleDateString("pt-BR"),
  ]);

  const csvContent = [header, ...row].map((e) => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "estatisticas.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function exportToPDF(occurrences: Occurrence[]) {
  const doc = new jsPDF();

  const logoBase64 = await loadLogoBase64();

  // Cabeçalho
  doc.setFillColor(214, 0, 0);
  doc.rect(0, 0, 210, 20, "F");

  if (logoBase64) {
    doc.addImage(logoBase64, "PNG", 10, 2, 16, 16);
  }
  // Texto do cabeçalho
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text("Corpo de Bombeiros Militar de Pernambuco", 105, 12, {
    align: "center",
  });

  // Subtitulo
  doc.setTextColor(240, 240, 240);
  doc.setFontSize(12);
  doc.text("Relatório de Ocorrências", 105, 18, {
    align: "center",
  });

  // Dados da Tabela
  const row = occurrences.map((o) => [
    o.id,
    o.titulo,
    o.cidade,
    o.regiao,
    o.status,
    new Date(o.dataHoraAbertura).toLocaleDateString("pt-BR"),
  ]);
  autoTable(doc, {
    head: [["ID", "Titulo", "Cidade", "Região", "Data", "Status"]],
    body: row,
    startY: 35,
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [214, 0, 0],
      textColor: [255, 255, 255],
      halign: "center",
    },
    bodyStyles: {
      fillColor: [245, 245, 245],
      textColor: [0, 0, 0],
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255],
    },
  });

  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.text(
    `Gerado em ${new Date().toLocaleDateString("pt-BR")}`,
    14,
    pageHeight - 10
  );

  doc.save("estatisticas.pdf");
}
