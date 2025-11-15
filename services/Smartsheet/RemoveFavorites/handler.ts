import smartsheet from 'smartsheet';
import { RemoveFavoritesInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: RemoveFavoritesInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { objectType, objectIds, outputVariable } = inputs;

  if (!objectType) {
    throw new Error('Object type is required');
  }
  if (!objectIds) {
    throw new Error('Object IDs are required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Removing multiple ${objectType} favorites`);

  try {
    const ids = objectIds.split(',').map((id: string) => id.trim());
    await client.favorites.removeFavorites({
      objectType: objectType.toLowerCase(),
      queryParameters: { objectIds: ids.join(',') },
    });
    log(`Removed ${ids.length} favorite(s)`);
    setOutput(outputVariable, {
      success: true,
      removedCount: ids.length,
      removedObjectType: objectType,
    });
  } catch (error: any) {
    throw new Error(`Failed to remove favorites: ${error.message}`);
  }
};
