export interface ListProofRequestVersionsInputs {
  sheetId: string;
  proofRequestId: string;
  proofId: string;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
  outputVariable: string;
}
