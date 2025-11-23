export interface CopySightInputs {
  sightId: string;
  destinationId: string;
  destinationType?: 'folder' | 'workspace';
  newName?: string;
  outputVariable: string;
}
