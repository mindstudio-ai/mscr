export interface ListProofAttachmentsInputs {
  sheetId: string;
  proofId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  filePath?: string;
  fileName?: string;
  outputVariable: string;
}
