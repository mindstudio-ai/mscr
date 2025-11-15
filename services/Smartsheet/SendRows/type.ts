export interface SendRowsInputs {
  sheetId: string;
  rowIds: string;
  recipientEmails: string;
  subject: string;
  message?: string;
  outputVariable: string;
}
