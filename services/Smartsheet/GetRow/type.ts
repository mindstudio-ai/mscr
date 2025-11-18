export interface GetRowInputs {
  sheetId: string;
  rowId: string;
  accessApiLevel?: number;
  include?: string;
  exclude?: string;
  level?: number;
  outputVariable: string;
}

export interface GetRowQueryParameters {
  accessApiLevel?: number;
  include?: string;
  exclude?: string;
  level?: number;
}
