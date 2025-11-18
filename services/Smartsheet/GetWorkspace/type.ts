export interface GetWorkspaceInputs {
  workspaceId: string;
  loadAll?: boolean;
  accessApiLevel?: number;
  include?: string;
  outputVariable: string;
}
