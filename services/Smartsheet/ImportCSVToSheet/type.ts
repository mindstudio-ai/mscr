export interface ImportCSVToSheetInputs {
  fileUrl: string;
  sheetName: string;
  headerRowIndex?: string;
  primaryColumnIndex?: number;
  outputVariable: string;
}
