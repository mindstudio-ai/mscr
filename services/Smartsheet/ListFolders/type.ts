export interface ListFoldersInputs {
  folderId: string;
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
  outputVariable: string;
}

export interface ListFoldersQueryParameters {
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
}
