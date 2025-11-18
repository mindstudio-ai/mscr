export interface ListSheetAttachmentsInputs {
  sheetId: string;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
  outputVariable: string;
}

export interface ListSheetAttachmentsQueryParameters {
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
}
