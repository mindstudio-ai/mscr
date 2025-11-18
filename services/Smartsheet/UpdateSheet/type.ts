export interface UpdateSheetInputs {
  sheetId: string;
  accessApiLevel?: number;
  name?: any;
  projectSettings?: any;
  lengthOfDay?: any;
  nonWorkingDays?: any;
  workingDays?: any;
  userSettings?: any;
  criticalPathEnabled?: any;
  displaySummaryTasks?: any;
  dependenciesEnabled?: any;
  sheetName?: string;
  outputVariable: string;
}

export interface UpdateSheetQueryParameters {
  accessApiLevel?: number;
}
