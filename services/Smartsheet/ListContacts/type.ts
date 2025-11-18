export interface ListContactsInputs {
  includeAll?: boolean;
  modifiedSince?: string;
  numericDates?: boolean;
  page?: number;
  pageSize?: number;
  outputVariable: string;
}
