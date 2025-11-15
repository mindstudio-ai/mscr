export interface Cell {
  columnId: number;
  value: any;
  displayValue?: string;
  formula?: string;
}

export interface Row {
  cells: Cell[];
  toTop?: boolean;
  toBottom?: boolean;
  parentId?: number;
  siblingId?: number;
  above?: boolean;
  [key: string]: any;
}

export interface AddRowsInputs {
  sheetId: string;
  rowsData: string | Row[];
  positionType?: 'toTop' | 'toBottom' | 'above' | 'below';
  siblingId?: string;
  outputVariable: string;
}
