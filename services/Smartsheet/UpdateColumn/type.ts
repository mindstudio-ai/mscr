export interface UpdateColumnInputs {
  sheetId: string;
  columnId: string;
  title?: string;
  index?: string;
  outputVariable: string;
}

export interface UpdateColumnBody {
  title?: string;
  index?: number;
}
