export interface UpdateUserInputs {
  userId: string;
  admin?: boolean;
  licensedSheetCreator?: boolean;
  firstName?: string;
  lastName?: string;
  outputVariable: string;
}

export interface UpdateUserBody {
  admin?: boolean;
  licensedSheetCreator?: boolean;
  firstName?: string;
  lastName?: string;
}
