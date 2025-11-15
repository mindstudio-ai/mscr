export type BooleanValue = boolean | '';

export interface PublishSettings {
  icalEnabled?: BooleanValue;
  readOnlyFullAccessibleBy?: string;
  readOnlyFullEnabled?: BooleanValue;
  readOnlyLiteEnabled?: BooleanValue;
  readOnlyLiteAccessibleBy?: string;
  readWriteEnabled?: BooleanValue;
}

export interface SetSheetPublishInputs {
  sheetId: string;
  publishSettings: PublishSettings;
  outputVariable: string;
}
