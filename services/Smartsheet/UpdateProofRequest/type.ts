export interface UpdateProofRequestInputs {
  sheetId: string;
  proofId: string;
  isCompleted?: string;
  message?: string;
  proofRequestId?: string;
  outputVariable: string;
}
