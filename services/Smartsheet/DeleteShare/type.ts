export interface DeleteShareInputs {
  sheetId: string;
  shareId: string;
  accessApiLevel?: number;
  outputVariable: string;
}

export interface DeleteShareQueryParameters {
  accessApiLevel?: number;
}
