export interface ListRowAttachmentsInputs {
  sheetId: number;
  rowId: number;
  includeAll?: boolean;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
