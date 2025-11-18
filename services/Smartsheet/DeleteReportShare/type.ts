export interface DeleteReportShareInputs {
  reportId: string;
  shareId: string;
  accessapilevel?: number;
  outputVariable: string;
}

export interface DeleteReportShareQueryParameters {
  accessapilevel?: number;
}
