type AccessibleBy = 'ALL' | 'ORG' | 'SHARED';

type DefaultView = 'CALENDAR' | 'CARD' | 'GRID';

export interface PublishSettings {
  icalEnabled: boolean;
  readOnlyFullAccessibleBy: AccessibleBy;
  readOnlyFullDefaultView: DefaultView;
  readOnlyFullEnabled: boolean;
  readOnlyLiteEnabled: boolean;
  readWriteAccessibleBy: AccessibleBy;
  readWriteDefaultView: DefaultView;
  readWriteEnabled: boolean;
}

export interface SetSheetPublishInputs extends PublishSettings {
  sheetId: string;
  outputVariable: string;
}
