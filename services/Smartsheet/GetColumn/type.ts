export interface GetColumnInputs {
  sheetId: string;
  columnId: string;
  level?: number;
  outputVariable: string;
}

export interface GetColumnQueryParameters {
  level?: number;
}
