export interface UpdateUserInputs {
  userId: string;
  admin: string;
  licensedSheetCreator: string;
  firstName?: string;
  lastName?: string;
  groupAdmin?: string;
  resourceViewer?: string;
  outputVariable: string;
}
