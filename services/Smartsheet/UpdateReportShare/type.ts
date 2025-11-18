export interface UpdateReportShareInputs {
  reportId: string;
  shareId: string;
  accessapilevel?: number;
  accesslevel?: string;
  outputVariable: string;
}

export interface UpdateReportShareQueryParameters {
  accessapilevel?: number;
}
