import smartsheet from 'smartsheet';
import { ListFavoritesInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListFavoritesInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { outputVariable } = inputs;

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log('Listing favorites');

  try {
    const response = await client.favorites.listFavorites();
    log(`Found ${response.totalCount || 0} favorite(s)`);
    setOutput(outputVariable, {
      totalCount: response.totalCount,
      favorites: response.data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list favorites: ${error.message}`);
  }
};
