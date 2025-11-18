export interface GetWorkspaceShareInputs {
  workspaceId: string;
  shareId: string;
  accessapilevel?: number;
  outputVariable: string;
}

export interface GetWorkspaceShareQueryParameters {
  accessapilevel?: number;
}
