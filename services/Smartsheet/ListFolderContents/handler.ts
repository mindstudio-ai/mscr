import { ListFolderContentsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListFolderContentsInputs>) => {
  const { folderId, include, outputVariable } = inputs;

  if (!folderId) {
    throw new Error('Folder ID is required');
  }

  log(`Listing contents of folder ${folderId}`);

  try {
    const queryParams: Record<string, string> = {};
    if (include) {
      queryParams.include = include;
    }

    const response = await smartsheetApiRequest<{
      data: any[];
    }>({
      method: 'GET',
      path: `/folders/${folderId}/contents`,
      queryParams,
    });

    const data = (response as any).data || response;
    const contents = Array.isArray(data) ? data : [];

    setOutput(outputVariable, {
      totalCount: contents.length,
      contents,
    });
  } catch (error: any) {
    throw new Error(`Failed to list folder contents: ${error.message}`);
  }
};
