export interface GetShareInputs {
  sheetId: string;
  shareId: string;
  accessApiLevel?: number;
  outputVariable: string;
}

export interface GetShareQueryParameters {
  accessApiLevel?: number;
}
