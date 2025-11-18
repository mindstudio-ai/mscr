export interface PublishSheetInputs {
  sheetId: string;
  icalEnabled?: string;
  readOnlyFullAccessibleBy?: string;
  readOnlyFullDefaultView?: string;
  readOnlyFullEnabled?: string;
  readOnlyFullShowToolbar?: string;
  readOnlyLiteEnabled?: string;
  readWriteAccessibleBy?: string;
  readWriteDefaultView?: string;
  readWriteEnabled?: string;
  readWriteShowToolbar?: string;
  outputVariable: string;
}
