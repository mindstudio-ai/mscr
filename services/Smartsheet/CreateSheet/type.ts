export interface ColumnDefinition {
  title: string;
  type: string;
  primary?: boolean;
  options?: string[];
  [key: string]: any;
}

export interface CreateSheetInputs {
  sheetName: string;
  columns: string | ColumnDefinition[];
  folderId?: string;
  workspaceId?: string;
  outputVariable: string;
}
