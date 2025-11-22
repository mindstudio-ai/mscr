export interface SendSheetInputs {
  sheetId: string;
  format?: string;
  formatDetails?: string;
  ccMe?: any;
  message?: any;
  sendTo?: string;
  subject?: any;
  outputVariable: string;
}
