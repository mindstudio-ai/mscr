export interface ImportCSVToSheetInputs {
  sheetName: string;
  headerRowIndex?: number;
  primaryColumnIndex?: number;
  outputVariable: string;
}

export interface ImportCSVToSheetQueryParameters {
  sheetName: string;
  headerRowIndex?: number;
  primaryColumnIndex?: number;
}
