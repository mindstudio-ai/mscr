export interface GetWorkspaceInputs {
  workspaceId: string;
  accessApiLevel?: number;
  include?: string;
  loadAll?: boolean;
  outputVariable: string;
}

export interface GetWorkspaceQueryParameters {
  accessApiLevel?: number;
  include?: string;
  loadAll?: boolean;
}
