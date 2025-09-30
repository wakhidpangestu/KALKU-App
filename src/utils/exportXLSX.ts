import * as XLSX from "xlsx";

export function exportToXLSX(filename: string, rows: (string | number)[][]) {
  // Buat worksheet dari 2D array
  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  // Buat workbook
  const workbook = XLSX.utils.book_new ? XLSX.utils.book_new() : XLSX.utils["book_new"]();
  XLSX.utils.book_append_sheet
    ? XLSX.utils.book_append_sheet(workbook, worksheet, "GLBB")
    : (XLSX.utils as any).book_append_sheet(workbook, worksheet, "GLBB");

  // Export file
  XLSX.writeFile(workbook, filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`);
}
