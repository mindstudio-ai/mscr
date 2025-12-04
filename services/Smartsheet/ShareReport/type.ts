export interface ShareReportInputs {
  reportId: string;
  type?: string;
  accessLevel?: string;
  ccMe?: boolean;
  createdAt?: string;
  email?: string;
  message?: string;
  modifiedAt?: string;
  scope?: string;
  subject?: string;
  sendEmail?: boolean;
  outputVariable: string;
}
