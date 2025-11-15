export interface Share {
  email?: string;
  groupId?: number;
  accessLevel: string;
  message?: string;
}

export interface ShareWorkspaceInputs {
  workspaceId: string;
  shares: Share[];
  sendEmail?: boolean;
  message?: string;
  outputVariable: string;
}

export interface ShareWorkspaceQueryParameters {
  sendEmail?: boolean;
}
