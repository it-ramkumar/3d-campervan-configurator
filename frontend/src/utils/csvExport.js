function escapeCsvValue(value) {
  if (value === null || value === undefined) return "";
  const str = typeof value === "object" ? JSON.stringify(value) : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Builds a CSV file from rows + column defs and triggers a browser download.
 * @param {Array<object>} rows
 * @param {Array<{key: string, label: string, accessor?: (row) => any}>} columns
 * @param {string} filename - without extension
 */
export function exportToCSV(rows, columns, filename = "export") {
  if (!rows || rows.length === 0) return;

  const header = columns.map((col) => escapeCsvValue(col.label)).join(",");
  const lines = rows.map((row) =>
    columns
      .map((col) => escapeCsvValue(col.accessor ? col.accessor(row) : row[col.key]))
      .join(",")
  );

  const csv = [header, ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
