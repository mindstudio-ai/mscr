export interface CopyFolderInputs {
  folderId: string;
  include?: string;
  exclude?: string;
  skipRemap?: string;
  destinationId?: any;
  destinationType?: any;
  newName?: any;
  outputVariable: string;
}

export interface CopyFolderQueryParameters {
  include?: string;
  exclude?: string;
  skipRemap?: string;
}
