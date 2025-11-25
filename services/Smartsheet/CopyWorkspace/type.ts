export interface CopyWorkspaceInputs {
  workspaceId: string;
  newName: string;
  includes?: string;
  include?: string;
  skipRemap?: string;
  outputVariable: string;
}
