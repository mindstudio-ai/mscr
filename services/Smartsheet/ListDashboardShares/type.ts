export interface ListDashboardSharesInputs {
  sightId: string;
  sharinginclude?: string;
  includeall?: boolean;
  page?: number;
  pagesize?: number;
  accessapilevel?: number;
  outputVariable: string;
}
