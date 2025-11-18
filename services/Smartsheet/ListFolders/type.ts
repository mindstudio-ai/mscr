export interface ListFoldersInputs {
  workspaceId: string;
  folderId: string;
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
  outputVariable: string;
}
