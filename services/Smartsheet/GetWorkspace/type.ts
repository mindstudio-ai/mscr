export interface GetWorkspaceInputs {
  workspaceId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
