import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Occurrence } from "@/types/occurrence";
import logo from "../../public/L.O.B.O.png";

async function loadLogoBase64(): Promise<string> {
  const res = await fetch("/L.O.B.O.png");
  const blob = await res.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
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
