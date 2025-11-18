export interface CopyFolderInputs {
  folderId: string;
  destinationType: string;
  destinationId?: string;
  newName: string;
  include?: string;
  exclude?: string;
  skipRemap?: string;
  outputVariable: string;
}
