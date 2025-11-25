export interface CreateUpdateRequestInputs {
  sheetId: string;
  rowIds: string;
  columnIds: string;
  recipientEmails: string;
  subject: string;
  message?: string;
  outputVariable: string;
}
