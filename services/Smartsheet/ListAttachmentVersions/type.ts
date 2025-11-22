export interface ListAttachmentVersionsInputs {
  sheetId: string;
  attachmentId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  filePath?: string;
  fileName?: string;
  outputVariable: string;
}
