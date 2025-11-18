export interface ImportXLSXToSheetInputs {
  fileUrl: string;
  sheetName: string;
  headerRowIndex?: string;
  primaryColumnIndex?: number;
  outputVariable: string;
}
