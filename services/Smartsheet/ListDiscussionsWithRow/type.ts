export interface ListDiscussionsWithRowInputs {
  sheetId: string;
  rowId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
