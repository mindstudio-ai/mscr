export interface UpdateShareInputs {
  sheetId: string;
  shareId: string;
  accessLevel?: string;
  accessApiLevel?: number;
  outputVariable: string;
}
