export interface CreateFolderInputs {
  parentType: string;
  parentId: string;
  name: string;
  folderId: string;
  include?: string;
  exclude?: string;
  skipRemap?: string;
  outputVariable: string;
}
