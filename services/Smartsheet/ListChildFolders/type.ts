export interface ListChildFoldersInputs {
  folderId: string;
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
  outputVariable: string;
}

export interface ListChildFoldersQueryParameters {
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
}
