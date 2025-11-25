export interface CreateProofRequestInputs {
  sheetId: string;
  proofId: string;
  approverEmails: string;
  message?: string;
  ccMe?: boolean;
  isDownloadable?: boolean;
  subject?: string;
  outputVariable: string;
}
