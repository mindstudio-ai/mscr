export interface ListWorkspaceFoldersInputs {
  workspaceId: string;
  includeall?: boolean;
  page?: number;
  pagesize?: number;
  outputVariable: string;
}

export interface ListWorkspaceFoldersQueryParameters {
  includeall?: boolean;
  page?: number;
  pagesize?: number;
}
