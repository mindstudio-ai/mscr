export interface ListSightsInputs {
  accessApiLevel?: number;
  includeAll?: boolean;
  modifiedSince?: string;
  numericDates?: boolean;
  page?: number;
  pageSize?: number;
  outputVariable: string;
}
