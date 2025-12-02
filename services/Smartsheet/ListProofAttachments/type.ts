export interface ListProofAttachmentsInputs {
  sheetId: string;
  proofId: string;
  pageSize?: number;
  page?: number;
  includeAll?: string;
  outputVariable: string;
}
