export interface GetSheetSummaryInputs {
  sheetId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
