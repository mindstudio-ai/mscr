export interface GetSheetInputs {
  sheetId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
