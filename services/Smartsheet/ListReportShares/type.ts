export interface ListReportSharesInputs {
  reportId: string;
  sharinginclude?: string;
  includeall?: boolean;
  page?: number;
  pagesize?: number;
  outputVariable: string;
}

export interface ListReportSharesQueryParameters {
  sharinginclude?: string;
  includeall?: boolean;
  page?: number;
  pagesize?: number;
}
