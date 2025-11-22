export interface GetShareInputs {
  sheetId: string;
  shareId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
