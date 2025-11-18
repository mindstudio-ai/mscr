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
  outputVariable: string;
}

export interface UpdateSheetQueryParameters {
  accessApiLevel?: number;
}
