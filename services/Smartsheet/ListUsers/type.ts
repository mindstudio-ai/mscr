export enum SeatTypes {
  MEMBER = 'MEMBER',
  PROVISIONAL_MEMBER = 'PROVISIONAL_MEMBER',
  GUEST = 'GUEST',
  VIEWER = 'VIEWER',
}

export interface ListUsersQueryParameters {
  email?: string;
  include?: string;
  includeAll?: boolean;
  numericDates?: boolean;
  planId?: number;
  seatType?: SeatTypes;
  page?: number;
  pageSize?: number;
}
