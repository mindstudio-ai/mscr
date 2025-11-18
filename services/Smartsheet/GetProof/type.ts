export interface GetProofInputs {
  sheetId: string;
  proofId: string;
  include?: string;
  outputVariable: string;
}

export interface GetProofQueryParameters {
  include?: string;
}
