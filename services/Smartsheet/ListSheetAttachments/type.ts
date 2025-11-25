export interface ListSheetAttachmentsInputs {
  sheetId: string;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
  outputVariable: string;
}
