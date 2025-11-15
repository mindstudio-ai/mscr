export interface MoveFolderInputs {
  folderId: string;
  destinationType: string;
  destinationId?: string;
  outputVariable: string;
}

export interface MoveFolderBody {
  destinationType: string;
  destinationId?: number;
}
