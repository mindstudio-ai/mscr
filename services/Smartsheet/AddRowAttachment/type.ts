export interface AddRowAttachmentInputs {
  sheetId: string;
  rowId: string;
  attachmentSubType?: string;
  attachmentType?: string;
  description: string;
  name: string;
  url: string;
  outputVariable: string;
}
