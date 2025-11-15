export interface SendSheetInputs {
  sheetId: string;
  recipientEmails: string;
  subject: string;
  message?: string;
  outputVariable: string;
}
