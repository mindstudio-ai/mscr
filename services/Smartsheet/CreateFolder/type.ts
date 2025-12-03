export interface CreateFolderInputs {
  folderId: string;
  id?: string;
  name?: string;
  permalink?: string;
  folders?: string;
  reports?: string;
  sheets?: string;
  sights?: string;
  templates?: string;
  include?: string;
  exclude?: string;
  skipRemap?: string;
  outputVariable: string;
}
