export interface ListProofRequestVersionsInputs {
  sheetId: string;
  proofId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
