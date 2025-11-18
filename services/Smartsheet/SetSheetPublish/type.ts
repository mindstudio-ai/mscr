export interface SetSheetPublishInputs {
  sheetId: string;
  icalEnabled?: 'True' | 'False';
  readOnlyFullAccessibleBy?: 'ALL' | 'ORG' | 'SHARED';
  readOnlyFullDefaultView?: 'CALENDAR' | 'CARD' | 'GRID';
  readOnlyFullEnabled?: 'True' | 'False';
  readOnlyLiteEnabled?: 'True' | 'False';
  readWriteAccessibleBy?: 'ALL' | 'ORG' | 'SHARED';
  readWriteDefaultView?: 'CALENDAR' | 'CARD' | 'GRID';
  readWriteEnabled?: 'True' | 'False';
  outputVariable: string;
}
