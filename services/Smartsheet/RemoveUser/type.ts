export interface RemoveUserInputs {
  userId: string;
  transferTo?: string;
  removeFromSharing?: boolean;
  outputVariable: string;
}

export interface RemoveUserQueryParameters {
  transferTo?: string;
  removeFromSharing?: boolean;
}
