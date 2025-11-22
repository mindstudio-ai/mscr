export interface ListGroupsInputs {
  includeAll?: boolean;
  modifiedSince?: string;
  numericDates?: boolean;
  page?: number;
  pageSize?: number;
  outputVariable: string;
}
