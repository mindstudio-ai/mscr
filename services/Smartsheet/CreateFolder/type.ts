export interface CreateFolderInputs {
  parentType: 'workspace' | 'folder';
  parentId: string;
  name: string;
  outputVariable: string;
}
