export interface ListDiscussionsWithRowInputs {
  sheetId: string;
  rowId: string;
  include?: string;
  page?: number;
  pagesize?: number;
  includeall?: boolean;
  outputVariable: string;
}

export interface ListDiscussionsWithRowQueryParameters {
  include?: string;
  page?: number;
  pagesize?: number;
  includeall?: boolean;
}
