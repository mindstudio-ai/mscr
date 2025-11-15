import { Row } from './AddRows/type';

export interface UpdateRow extends Row {
  id: number;
}

export interface UpdateRowsInputs {
  sheetId: string;
  rowsData: string | UpdateRow[];
  outputVariable: string;
}
