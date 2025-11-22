export interface AddColumnInputs {
  sheetId: string;
  title?: string;
  type?: "ABSTRACT_DATETIME"
  | "CHECKBOX"
  | "CONTACT_LIST"
  | "DATE"
  | "DATETIME"
  | "DURATION"
  | "MULTI_CONTACT_LIST"
  | "MULTI_PICKLIST"
  | "PICKLIST"
  | "PREDECESSOR"
  | "TEXT_NUMBER";
  formula?: string;
  format?: string;
  contactOptions?: {
    email: string;
    name: string;
  };
  index?: number;
  autoNumberFormat?: string;
  description?: string;
  locked?: boolean;
  lockedForUser?: boolean;
  options?: string[];
  symbol?: string;
  systemColumnType?: "AUTO_NUMBER"
  | "CREATED_BY"
  | "CREATED_DATE"
  | "MODIFIED_BY"
  | "MODIFIED_DATE";
  validation?: boolean;
  width?: number;
  hidden?: boolean;
  outputVariable: string;
}
