export interface AddUserInputs {
  email: string;
  firstName?: string;
  lastName?: string;
  admin?: boolean;
  licensedSheetCreator?: boolean;
  outputVariable: string;
}
