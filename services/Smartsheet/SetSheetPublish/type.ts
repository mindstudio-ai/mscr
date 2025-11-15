export type BooleanValue = boolean | '';

export interface PublishSettings {
  icalEnabled?: BooleanValue;
  readOnlyFullAccessibleBy?: string;
  readOnlyFullEnabled?: BooleanValue;
  readOnlyLiteEnabled?: BooleanValue;
  readOnlyLiteAccessibleBy?: string;
  readWriteEnabled?: BooleanValue;
}

export interface SetSheetPublishInputs extends PublishSettings {
  sheetId: string;
  outputVariable: string;
}
