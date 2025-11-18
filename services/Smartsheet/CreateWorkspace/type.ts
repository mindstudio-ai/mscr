export interface CreateWorkspaceInputs {
  name: string;
  include?: string;
  skipRemap?: string;
  accessApiLevel?: number;
  outputVariable: string;
}
