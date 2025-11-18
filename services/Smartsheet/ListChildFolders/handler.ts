import { ListChildFoldersInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListChildFoldersInputs>) => {
  const { folderId, includeAll, page, pageSize, outputVariable } = inputs;

  if (!folderId) {
    throw new Error('Folder ID is required');
  }

  log(`Listing child folders of folder ${folderId}`);

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    if (includeAll !== undefined) {
      queryParams.includeAll = includeAll;
    }
    if (page !== undefined) {
      queryParams.page = page;
    }
    if (pageSize !== undefined) {
      queryParams.pageSize = pageSize;
    }

    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/folders/${folderId}`,
      queryParams,
    });
    const folders = (response as any).folders || [];
    log(`Found ${folders.length} child folder(s)`);
    setOutput(outputVariable, {
      totalCount: folders.length,
      folders,
    });
  } catch (error: any) {
    throw new Error(`Failed to list child folders: ${error.message}`);
  }
};
