export interface ListProofAttachmentsInputs {
  sheetId: string;
  proofId: string;
  page?: number;
  pagesize?: number;
  includeall?: boolean;
  outputVariable: string;
}

export interface ListProofAttachmentsQueryParameters {
  page?: number;
  pagesize?: number;
  includeall?: boolean;
}
