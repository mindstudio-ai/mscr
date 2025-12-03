export interface CopyFolderInputs {
  folderId: string;
  destinationId?: string;
  destinationType?: string;
  newName?: string;
  include?: string;
  exclude?: string;
  skipRemap?: string;
  outputVariable: string;
}
