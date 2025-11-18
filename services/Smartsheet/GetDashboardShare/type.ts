export interface GetDashboardShareInputs {
  sightId: string;
  shareId: string;
  accessapilevel?: number;
  outputVariable: string;
}

export interface GetDashboardShareQueryParameters {
  accessapilevel?: number;
}
