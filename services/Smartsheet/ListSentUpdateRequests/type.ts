export interface ListSentUpdateRequestsInputs {
  sheetId: string;
  includeall?: boolean;
  page?: number;
  pagesize?: number;
  outputVariable: string;
}

export interface ListSentUpdateRequestsQueryParameters {
  includeall?: boolean;
  page?: number;
  pagesize?: number;
}
