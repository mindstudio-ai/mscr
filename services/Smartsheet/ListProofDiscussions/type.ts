export interface ListProofDiscussionsInputs {
  sheetId: string;
  proofId: string;
  include?: string;
  page?: number;
  pagesize?: number;
  includeall?: boolean;
  outputVariable: string;
}

export interface ListProofDiscussionsQueryParameters {
  include?: string;
  page?: number;
  pagesize?: number;
  includeall?: boolean;
}
