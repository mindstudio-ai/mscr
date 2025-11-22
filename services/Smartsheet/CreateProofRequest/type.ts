export interface CreateProofRequestInputs {
  sheetId: string;
  proofId: string;
  isDownloadable?: string;
  ccMe?: any;
  message?: any;
  sendTo?: string;
  subject?: any;
  outputVariable: string;
}
