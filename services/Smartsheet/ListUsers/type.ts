export interface ListUsersInputs {
  email?: string;
  include?: string;
  includeAll?: boolean;
  modifiedSince?: string;
  numericDates?: boolean;
  page?: number;
  pageSize?: number;
  outputVariable: string;
}

export interface ListUsersQueryParameters {
  email?: string;
  include?: string;
  includeAll?: boolean;
  modifiedSince?: string;
  numericDates?: boolean;
  page?: number;
  pageSize?: number;
}
