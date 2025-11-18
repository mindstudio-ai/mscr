export interface GetSheetInputs {
  sheetId: string;
  include?: string;
  exclude?: string;
  columnIds?: string;
  filterId?: string;
  rowIds?: string;
  rowNumbers?: string;
  rowsModifiedSince?: string;
  accessApiLevel?: number;
  level?: number;
  ifVersionAfter?: number;
  pageSize?: number;
  page?: number;
  paperSize?: string;
  outputVariable: string;
}
