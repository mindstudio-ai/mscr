import { RemoveFavoritesInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<RemoveFavoritesInputs>) => {
  const { favoriteType, objectIds, outputVariable } = inputs;

  if (!favoriteType) {
    throw new Error('Favorite type is required');
  }
  if (!objectIds) {
    throw new Error('Object IDs are required');
  }

  log(`Removing multiple ${favoriteType} favorites`);

  try {
    const ids = objectIds.split(',').map((id: string) => id.trim());
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/favorites/${favoriteType.toLowerCase()}`,
      queryParams: { objectIds: ids.join(',') },
    });
    log(`Removed ${ids.length} favorite(s)`);
    setOutput(outputVariable, {
      success: true,
      removedCount: ids.length,
      removedObjectType: favoriteType,
    });
  } catch (error: any) {
    throw new Error(`Failed to remove favorites: ${error.message}`);
  }
};
