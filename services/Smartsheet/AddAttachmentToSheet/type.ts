export interface AddAttachmentToSheetInputs {
  sheetId: string;
  attachmentType: 'FILE' | 'LINK';
  filePath?: string;
  url?: string;
  name?: string;
  outputVariable: string;
}
