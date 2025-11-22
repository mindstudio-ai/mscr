export interface SendSheetInputs {
  sheetId: string;
  format?: 'EXCEL' | 'PDF' | 'PDF_GANTT';
  paperSize?: "A0"
  | "A1"
  | "A2"
  | 'A3'
  | 'A4'
  | 'ARCHID'
  | 'LEGAL'
  | 'LETTER'
  | 'WIDE';
  ccMe?: any;
  message?: any;
  sendTo?: string;
  subject?: any;
  outputVariable: string;
}
