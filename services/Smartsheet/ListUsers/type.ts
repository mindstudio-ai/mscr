export interface ListUsersInputs {
  email?: string;
  include?: string;
  planId?: number;
  seatType?: 'MEMBER' | 'PROVISIONAL_MEMBER' | 'GUEST' | 'VIEWER';
  includeAll?: boolean;
  modifiedSince?: string;
  numericDates?: boolean;
  page?: number;
  pageSize?: number;
  outputVariable: string;
}
