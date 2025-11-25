export interface ListDiscussionsInputs {
  sheetId: string;
  include?: string;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
  outputVariable: string;
}
