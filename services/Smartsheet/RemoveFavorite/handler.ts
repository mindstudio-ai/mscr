import smartsheet from 'smartsheet';
import { RemoveFavoriteInputs } from './type';

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

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Removing ${objectType} ${objectId} from favorites`);

  try {
    await client.favorites.removeFavorite({
      objectType: objectType.toLowerCase(),
      objectId,
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
