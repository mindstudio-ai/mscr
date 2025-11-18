import { RemoveFavoriteInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: RemoveFavoriteInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { objectType, objectId, outputVariable } = inputs;

  if (!objectType) {
    throw new Error('Object type is required');
  }
  if (!objectId) {
    throw new Error('Object ID is required');
  }

  log(`Removing ${objectType} ${objectId} from favorites`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/favorites/${objectType.toLowerCase()}/${objectId}`,
    });
    log('Favorite removed successfully');
    setOutput(outputVariable, {
      success: true,
      removedObjectId: objectId,
      removedObjectType: objectType,
    });
  } catch (error: any) {
    throw new Error(`Failed to remove favorite: ${error.message}`);
  }
};
