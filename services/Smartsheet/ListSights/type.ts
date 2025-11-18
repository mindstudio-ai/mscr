export interface ListSightsInputs {
  accessApiLevel?: number;
  includeAll?: boolean;
  modifiedSince?: string;
  numericDates?: boolean;
  page?: number;
  pageSize?: number;
  outputVariable: string;
}

export interface ListSightsQueryParameters {
  accessApiLevel?: number;
  includeAll?: boolean;
  modifiedSince?: string;
  numericDates?: boolean;
  page?: number;
  pageSize?: number;
}
