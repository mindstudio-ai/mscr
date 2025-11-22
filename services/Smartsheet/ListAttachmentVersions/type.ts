export interface ListAttachmentVersionsInputs {
  sheetId: number;
  attachmentId: string;
  includeAll?: boolean;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
