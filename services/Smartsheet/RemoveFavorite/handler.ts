import { RemoveFavoriteInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<RemoveFavoriteInputs>) => {
  const { favoriteType, favoriteId, outputVariable } = inputs;

  if (!favoriteType) {
    throw new Error('favoriteType is required');
  }
  if (!favoriteId) {
    throw new Error('favoriteId is required');
  }

  log(`Removing ${favoriteType} ${favoriteId} from favorites`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/favorites/${favoriteType.toLowerCase()}/${favoriteId}`,
    });
    log('Favorite removed successfully');
    setOutput(outputVariable, {
      success: true,
      removedFavoriteId: favoriteId,
      removedFavoriteType: favoriteType,
    });
  } catch (error: any) {
    throw new Error(`Failed to remove favorite: ${error.message}`);
  }
};
