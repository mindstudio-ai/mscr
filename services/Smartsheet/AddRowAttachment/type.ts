export interface AddRowAttachmentInputs {
  sheetId: string;
  rowId: string;
  attachmentType: 'FILE' | 'LINK';
  filePath?: string;
  url?: string;
  outputVariable: string;
}
