export interface GetWorkspaceInputs {
  workspaceId: string;
  loadAll?: boolean;
  outputVariable: string;
}

export interface GetWorkspaceQueryParameters {
  loadAll?: boolean;
}
