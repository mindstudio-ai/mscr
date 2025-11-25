export interface ListProofAttachmentsInputs {
  sheetId: string;
  proofId: string;
  page?: number;
  pagesize?: number;
  includeall?: boolean;
  outputVariable: string;
}
