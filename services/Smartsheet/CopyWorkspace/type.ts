export interface CopyWorkspaceInputs {
  workspaceId: string;
  newName: string;
  includes?: string[];
  outputVariable: string;
}
