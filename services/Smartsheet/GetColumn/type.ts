export interface GetColumnInputs {
  sheetId: string;
  columnId: string;
  level?: 1 | 2 | 3;
  outputVariable: string;
}
