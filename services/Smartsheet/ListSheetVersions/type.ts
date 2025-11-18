export interface ListSheetVersionsInputs {
  sheetId: string;
  attachmentId: string;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
  outputVariable: string;
}
