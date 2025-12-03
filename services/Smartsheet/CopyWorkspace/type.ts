export interface CopyWorkspaceInputs {
  workspaceId: string;
  destinationId?: string;
  destinationType?: string;
  newName?: string;
  include?: string;
  skipRemap?: string;
  outputVariable: string;
}
