export interface ListSheetsInputs {
  includeOwnerInfo?: boolean;
  modifiedSince?: string;
  include?: string;
  includeAll?: boolean;
  numericDates?: boolean;
  page?: number;
  pageSize?: number;
  accessApiLevel?: number;
  outputVariable: string;
}
