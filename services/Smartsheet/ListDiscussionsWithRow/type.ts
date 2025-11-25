export interface ListDiscussionsWithRowInputs {
  sheetId: string;
  rowId: string;
  include?: string;
  page?: number;
  pagesize?: number;
  includeall?: boolean;
  outputVariable: string;
}
