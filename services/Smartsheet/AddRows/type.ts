export interface AddRowsInputs {
  sheetId: string;
  rowsData: string;
  positionType?: 'toBottom' | 'toTop' | 'above' | 'below';
  siblingId?: string;
  accessApiLevel?: number;
  allowPartialSuccess?: boolean;
  overrideValidation?: boolean;
  outputVariable: string;
}
