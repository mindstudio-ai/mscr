export interface UpdateReportShareInputs {
  reportId: string;
  shareId: string;
  accessLevel?: string;
  accessApiLevel?: number;
  outputVariable: string;
}
