export interface ImportCSVToSheetInputs {
  fileUrl: string;
  sheetName: string;
  headerRowIndex?: number;
  outputVariable: string;
}
