export interface ImportXLSXToSheetInputs {
  fileUrl: string;
  sheetName: string;
  headerRowIndex?: number;
  outputVariable: string;
}
