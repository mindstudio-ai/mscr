export interface GetDashboardShareInputs {
  sightId: string;
  shareId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
