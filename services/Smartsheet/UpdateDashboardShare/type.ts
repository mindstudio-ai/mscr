export interface UpdateDashboardShareInputs {
  sightId: string;
  shareId: string;
  accessapilevel?: number;
  accesslevel?: string;
  outputVariable: string;
}

export interface UpdateDashboardShareQueryParameters {
  accessapilevel?: number;
}
