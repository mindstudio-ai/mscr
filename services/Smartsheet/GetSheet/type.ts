export interface GetSheetInputs {
  sheetId: string;
  accessApiLevel?: number;
  include?: string;
  exclude?: string;
  columnIds?: string;
  filterId?: string;
  ifVersionAfter?: number;
  level?: number;
  pageSize?: number;
  page?: number;
  paperSize?: string;
  rowIds?: string;
  rowNumbers?: string;
  rowsModifiedSince?: string;
  outputVariable: string;
}

export interface GetSheetQueryParameters {
  accessApiLevel?: number;
  include?: string;
  exclude?: string;
  columnIds?: string;
  filterId?: string;
  ifVersionAfter?: number;
  level?: number;
  pageSize?: number;
  page?: number;
  paperSize?: string;
  rowIds?: string;
  rowNumbers?: string;
  rowsModifiedSince?: string;
}
