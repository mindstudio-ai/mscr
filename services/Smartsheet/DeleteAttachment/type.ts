export interface DeleteAttachmentInputs {
  sheetId: string;
  attachmentId: string;
  filePath?: string;
  fileName?: string;
  outputVariable: string;
}
