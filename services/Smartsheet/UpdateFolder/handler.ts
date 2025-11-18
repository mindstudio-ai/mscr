import { UpdateFolderInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateFolderInputs>) => {
  const { folderId, name, outputVariable } = inputs;

  if (!folderId) {
    throw new Error('Folder ID is required');
  }
  if (!name) {
    throw new Error('New name is required');
  }

  log(`Updating folder ${folderId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/folders/${folderId}`,
      body: { name },
    });
    log('Folder updated successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to update folder: ${error.message}`);
  }
};
