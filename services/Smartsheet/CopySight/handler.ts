import { CopySightInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<CopySightInputs>) => {
  const { sightId, newName, destinationFolderId, outputVariable } = inputs;

  if (!sightId) {
    throw new Error('Sight ID is required');
  }
  if (!newName) {
    throw new Error('New dashboard name is required');
  }

  log(`Copying dashboard ${sightId} to ${newName}`);

  try {
    const copyBody: any = {
      destinationType: destinationFolderId ? 'folder' : 'home',
      newName,
    };
    if (destinationFolderId) {
      copyBody.destinationId = parseInt(destinationFolderId, 10);
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sights/${sightId}/copy`,
      body: copyBody,
    });
    log('Dashboard copied successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to copy dashboard: ${error.message}`);
  }
};
