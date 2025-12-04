export interface SendReportInputs {
  reportId: string;
  format?: string;
  formatDetails?: string;
  ccMe?: boolean;
  message?: string;
  sendTo?: string;
  subject?: string;
  outputVariable: string;
}
