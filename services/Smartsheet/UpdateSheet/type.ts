export interface UpdateSheetInputs {
  sheetId: string;
  sheetName?: string;
  criticalPathEnabled?: '' | 'true' | 'false';
  dependenciesEnabled?: '' | 'true' | 'false';
  accessApiLevel?: number;
  outputVariable: string;
}
