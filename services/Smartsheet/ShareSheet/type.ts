export interface ShareSheetInputs {
  sheetId: string;
  email: string;
  accessLevel: string;
  message?: string;
  sendEmail?: boolean;
  accessApiLevel?: number;
  outputVariable: string;
}
