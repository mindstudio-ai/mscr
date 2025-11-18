import { AddFavoriteInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: AddFavoriteInputs;
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

  log(`Adding ${objectType} ${objectId} to favorites`);

  try {
    const response = await smartsheetApiRequest({
      method: 'POST',
      path: '/favorites',
      body: {
        type: objectType.toLowerCase(),
        objectId: parseInt(objectId, 10),
      },
    });
    log('Favorite added successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to add favorite: ${error.message}`);
  }
};
