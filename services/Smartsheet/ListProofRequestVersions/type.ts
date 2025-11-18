export interface ListProofRequestVersionsInputs {
  sheetId: string;
  proofId: string;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
  outputVariable: string;
}

export interface ListProofRequestVersionsQueryParameters {
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
}
