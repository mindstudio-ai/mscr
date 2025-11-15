export interface ShareReportInputs {
  reportId: string;
  email: string;
  accessLevel: string;
  outputVariable: string;
}

export interface ShareReportBody {
  email: string;
  accessLevel: string;
}
