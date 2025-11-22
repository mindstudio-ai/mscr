export interface ListWorkspaceFoldersInputs {
  workspaceId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
