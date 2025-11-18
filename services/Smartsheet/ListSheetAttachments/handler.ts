import { ListSheetAttachmentsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListSheetAttachmentsInputs>) => {
  const { sheetId, page, pageSize, includeAll, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Listing attachments for sheet: ${sheetId}`);

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
      path: `/sheets/${sheetId}/attachments`,
      queryParams,
    });

    const data = (response as any).data || response;
    const totalCount =
      (response as any).totalCount || (Array.isArray(data) ? data.length : 0);
    log(
      `Successfully retrieved ${Array.isArray(data) ? data.length : 0} attachment(s)`,
    );

    setOutput(outputVariable, {
      totalCount,
      attachments: data,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      throw new Error(`Sheet not found: ${sheetId}`);
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Permission')
    ) {
      throw new Error('Permission denied');
    } else {
      throw new Error(`Failed to list attachments: ${errorMessage}`);
    }
  }
};
