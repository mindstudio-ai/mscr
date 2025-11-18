export interface ListWorkspacesInputs {
  includeAll?: boolean;
  lastKey?: string;
  page?: number;
  pageSize?: number;
  accessApiLevel?: number;
  outputVariable: string;
}

export interface ListWorkspacesQueryParameters {
  includeAll?: boolean;
  lastKey?: string;
  page?: number;
  pageSize?: number;
  accessApiLevel?: number;
}
