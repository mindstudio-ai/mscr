export interface CreateFolderInputs {
  folderId: string;
  include?: string;
  exclude?: string;
  skipRemap?: string;
  id?: any;
  name?: any;
  favorite?: any;
  permalink?: any;
  folders?: any;
  value?: any;
  reports?: any;
  sheets?: any;
  sights?: any;
  createdAt?: any;
  modifiedAt?: any;
  templates?: any;
  outputVariable: string;
}

export interface CreateFolderQueryParameters {
  include?: string;
  exclude?: string;
  skipRemap?: string;
}
