export interface AddColumnInputs {
  sheetId: string;
  columnTitle: string;
  columnType: string;
  picklistOptions?: string | string[];
  insertPosition?: 'beginning' | 'end' | 'before' | 'after';
  siblingColumnIndex?: string;
  outputVariable: string;
}

export interface ColumnSpec {
  title: string;
  type: string;
  options?: string[];
  index?: number;
}
