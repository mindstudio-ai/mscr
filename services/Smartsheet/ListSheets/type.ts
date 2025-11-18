export interface ListSheetsInputs {
  include?: string;
  includeAll?: boolean;
  modifiedSince?: string;
  numericDates?: boolean;
  page?: number;
  pageSize?: number;
  accessApiLevel?: number;
  outputVariable: string;
}

export interface ListSheetsQueryParameters {
  include?: string;
  includeAll?: boolean;
  modifiedSince?: string;
  numericDates?: boolean;
  page?: number;
  pageSize?: number;
  accessApiLevel?: number;
}
