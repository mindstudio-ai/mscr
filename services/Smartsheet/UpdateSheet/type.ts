export interface UpdateSheetInputs {
  sheetId: string;
  sheetName?: string;
  criticalPathEnabled?: boolean | string;
  dependenciesEnabled?: boolean | string;
  outputVariable: string;
}

export interface UpdateSheetBody {
  name?: string;
  userSettings?: {
    criticalPathEnabled?: boolean;
    dependenciesEnabled?: boolean;
  };
}
