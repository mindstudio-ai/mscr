import { ListFoldersInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListFoldersInputs>) => {
  const { folderId, includeAll, page, pageSize, outputVariable } = inputs;

  if (!folderId) {
    throw new Error('Folder ID is required');
  }

  log(`Listing folders in folder ${folderId}`);

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

    const response = await smartsheetApiRequest<{
      data: Array<{ resourceType: string }>;
    }>({
      method: 'GET',
      path: `/folders/${folderId}/folders`,
      queryParams,
    });
    const data = (response as any).data || response;
    const folders = Array.isArray(data)
      ? data.filter((item: any) => item.resourceType === 'folder')
      : [];
    log(`Found ${folders.length} folder(s)`);
    setOutput(outputVariable, {
      totalCount: folders.length,
      folders,
    });
  } catch (error: any) {
    throw new Error(`Failed to list folders: ${error.message}`);
  }
};
