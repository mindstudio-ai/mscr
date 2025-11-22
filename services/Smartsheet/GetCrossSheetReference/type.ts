export interface GetCrossSheetReferenceInputs {
  sheetId: string;
  crossSheetReferenceId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
