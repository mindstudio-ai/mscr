export interface ListWorkspaceSharesInputs {
  workspaceId: string;
  page?: number;
  pagesize?: number;
  includeall?: boolean;
  accessapilevel?: number;
  outputVariable: string;
}

export interface ListWorkspaceSharesQueryParameters {
  page?: number;
  pagesize?: number;
  includeall?: boolean;
  accessapilevel?: number;
}
