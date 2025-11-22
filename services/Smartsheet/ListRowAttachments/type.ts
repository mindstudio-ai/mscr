export interface ListRowAttachmentsInputs {
  sheetId: string;
  rowId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  filePath?: string;
  fileName?: string;
  outputVariable: string;
}
