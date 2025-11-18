export interface AddColumnInputs {
  sheetId: string;
  columnTitle: string;
  columnType: 'TEXT_NUMBER' | 'PICKLIST' | 'DATE' | 'CONTACT_LIST' | 'CHECKBOX' | 'DURATION';
  picklistOptions?: string;
  insertPosition?: 'end' | 'beginning' | 'before' | 'after';
  siblingColumnIndex?: string;
  outputVariable: string;
}
