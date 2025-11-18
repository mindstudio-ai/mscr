export interface ListUpdateRequestsInputs {
  sheetId: string;
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
  outputVariable: string;
}

export interface ListUpdateRequestsQueryParameters {
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
}
