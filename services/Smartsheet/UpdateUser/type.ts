export interface UpdateUserInputs {
  userId: string;
  firstName?: string;
  lastName?: string;
  admin?: boolean;
  licensedSheetCreator?: boolean;
  outputVariable: string;
}
