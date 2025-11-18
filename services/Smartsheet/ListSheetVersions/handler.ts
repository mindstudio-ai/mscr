import { ListSheetVersionsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListSheetVersionsInputs>) => {
  const { sheetId, attachmentId, page, pageSize, includeAll, outputVariable } =
    inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Listing versions for sheet ${sheetId}`);

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    if (page !== undefined) {
      queryParams.page = page;
    }
    if (pageSize !== undefined) {
      queryParams.pageSize = pageSize;
    }
    if (includeAll !== undefined) {
      queryParams.includeAll = includeAll;
    }

    const response = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: `/sheets/${sheetId}/versions`,
      queryParams,
    });
    const data = (response as any).data || response;
    const versions = Array.isArray(data) ? data : [];
    log(`Found ${versions.length} version(s)`);
    setOutput(outputVariable, {
      totalCount: versions.length,
      versions,
    });
  } catch (error: any) {
    throw new Error(`Failed to list sheet versions: ${error.message}`);
  }
};
