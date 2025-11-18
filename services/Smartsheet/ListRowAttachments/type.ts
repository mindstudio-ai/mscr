export interface ListRowAttachmentsInputs {
  sheetId: string;
  rowId: string;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
  outputVariable: string;
}
