export interface ListProofsInputs {
  sheetId: string;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
  outputVariable: string;
}

export interface ListProofsQueryParameters {
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
}
