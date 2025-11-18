export interface GetSheetSummaryInputs {
  sheetId: string;
  include?: string;
  exclude?: string;
  outputVariable: string;
}

export interface GetSheetSummaryQueryParameters {
  include?: string;
  exclude?: string;
}
