export interface GetReportShareInputs {
  reportId: string;
  shareId: string;
  accessapilevel?: number;
  outputVariable: string;
}

export interface GetReportShareQueryParameters {
  accessapilevel?: number;
}
