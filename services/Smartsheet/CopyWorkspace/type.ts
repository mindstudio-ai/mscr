export interface CopyWorkspaceInputs {
  workspaceId: string;
  include?: string;
  skipRemap?: string;
  destinationId?: any;
  destinationType?: any;
  newName?: any;
  outputVariable: string;
}

export interface CopyWorkspaceQueryParameters {
  include?: string;
  skipRemap?: string;
}
