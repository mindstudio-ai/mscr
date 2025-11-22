export interface GetProofInputs {
  sheetId: string;
  proofId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
