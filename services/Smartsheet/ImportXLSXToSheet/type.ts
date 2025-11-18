export interface ImportXLSXToSheetInputs {
  sheetName: string;
  headerRowIndex?: number;
  primaryColumnIndex?: number;
  outputVariable: string;
}

export interface ImportXLSXToSheetQueryParameters {
  sheetName: string;
  headerRowIndex?: number;
  primaryColumnIndex?: number;
}
