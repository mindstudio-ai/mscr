export interface ListRowAttachmentsInputs {
  sheetId: string;
  rowId: string;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
  outputVariable: string;
}

export interface ListRowAttachmentsQueryParameters {
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
}
