import { GetFolderInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetFolderInputs>) => {
  const { folderId, include, outputVariable } = inputs;

  if (!folderId) {
    throw new Error('Folder ID is required');
  }

  log(`Getting folder ${folderId}`);
  try {
    const queryParams: Record<string, string> = {};
    if (include) {
      queryParams.include = include;
    }

    const result = await smartsheetApiRequest({
      method: 'GET',
      path: `/folders/${folderId}`,
      queryParams,
    });
    log('Retrieved folder successfully');
    setOutput(outputVariable, result);
  } catch (error: any) {
    throw new Error(`Failed to get folder: ${error.message}`);
  }
};
