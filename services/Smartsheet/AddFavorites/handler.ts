import { AddFavoritesInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<AddFavoritesInputs>) => {
  const { favoritesJson, outputVariable } = inputs;

  if (!favoritesJson) {
    throw new Error('Favorites JSON is required');
  }

  log('Adding multiple favorites');

  try {
    const favorites = JSON.parse(favoritesJson);
    const response = await smartsheetApiRequest({
      method: 'POST',
      path: '/favorites',
      body: favorites,
    });
    const result = Array.isArray(response) ? response : [response];
    log(`Added ${result.length} favorite(s)`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    throw new Error(`Failed to add favorites: ${error.message}`);
  }
};
