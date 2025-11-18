export interface ListProofRequestActionsInputs {
  sheetId: string;
  proofId: string;
  page?: number;
  pagesize?: number;
  includeall?: boolean;
  outputVariable: string;
}
