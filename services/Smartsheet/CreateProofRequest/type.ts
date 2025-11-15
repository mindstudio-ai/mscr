export interface CreateProofRequestInputs {
  sheetId: string;
  rowId: string;
  attachmentId: string;
  approverEmails: string;
  message?: string;
  outputVariable: string;
}

export interface ProofApprover {
  email: string;
}

export interface ProofRequestBody {
  attachmentId: string;
  approvers: ProofApprover[];
  message?: string;
}
