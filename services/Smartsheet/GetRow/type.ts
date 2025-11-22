export interface GetRowInputs {
  sheetId: number;
  rowId: number;
  accessApiLevel?: number;
  include?: string;
  exclude?: string;
  level?: 0 | 1 | 2;
  outputVariable: string;
}
