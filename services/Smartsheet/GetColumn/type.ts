export interface GetColumnInputs {
  sheetId: string;
  columnId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
