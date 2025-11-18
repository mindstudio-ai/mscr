export interface GetReportInputs {
  reportId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  level?: number;
  accessApiLevel?: number;
  outputVariable: string;
}

export interface GetReportQueryParameters {
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  level?: number;
  accessApiLevel?: number;
}
