export interface UpdateWorkspaceShareInputs {
  workspaceId: string;
  shareId: string;
  accessLevel?: string;
  accessApiLevel?: string;
  outputVariable: string;
}
