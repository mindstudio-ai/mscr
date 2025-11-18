export interface ShareWorkspaceInputs {
  workspaceId: string;
  shares: string;
  sendEmail?: boolean;
  message?: string;
  accessApiLevel?: number;
  outputVariable: string;
}
