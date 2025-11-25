export interface ListAttachmentVersionsInputs {
  sheetId: string;
  attachmentId: string;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
  outputVariable: string;
}
