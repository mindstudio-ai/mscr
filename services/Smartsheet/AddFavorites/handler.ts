import smartsheet from 'smartsheet';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { favoritesJson, outputVariable } = inputs;

  if (!favoritesJson) {
    throw new Error('Favorites JSON is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log('Adding multiple favorites');

  try {
    const favorites = JSON.parse(favoritesJson);
    const response = await client.favorites.addFavorites({
      body: favorites,
    });
    log(`Added ${favorites.length} favorite(s)`);
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to add favorites: ${error.message}`);
  }
};
