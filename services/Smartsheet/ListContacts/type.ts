export interface ListContactsInputs {
  includeAll?: boolean;
  pageSize?: number;
  page?: number;
  modifiedSince?: string;
  numericDates?: boolean;
  outputVariable: string;
}
