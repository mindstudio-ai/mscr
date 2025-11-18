export interface ListDiscussionsInputs {
  sheetId: string;
  include?: string;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
  outputVariable: string;
}

export interface ListDiscussionsQueryParameters {
  include?: string;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
}
