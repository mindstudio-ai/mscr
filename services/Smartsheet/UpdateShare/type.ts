export interface UpdateShareInputs {
  sheetId: string;
  shareId: string;
  accessApiLevel?: number;
  accessLevel?: string;
  outputVariable: string;
}

export interface UpdateShareQueryParameters {
  accessApiLevel?: number;
}
