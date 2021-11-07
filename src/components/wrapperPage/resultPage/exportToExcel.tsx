import React from 'react';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ResultInfo } from '.';

export default function ExportToExcel(props: { data: ResultInfo[]; fileName: string }): JSX.Element {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  function exportToCSV(apiData: unknown[], fileName: string) {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  return (
    <button className="export-button" onClick={() => exportToCSV(props.data, props.fileName)}>
      Save data
    </button>
  );
}
