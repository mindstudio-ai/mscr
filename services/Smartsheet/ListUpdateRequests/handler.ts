import { ListUpdateRequestsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListUpdateRequestsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, includeAll, page, pageSize, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Listing update requests for sheet ${sheetId}`);

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
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: `/sheets/${sheetId}/updaterequests`,
      queryParams,
    });
    const data = (response as any).data || response;
    const requests = Array.isArray(data) ? data : [];
    log(`Found ${requests.length} update request(s)`);
    setOutput(outputVariable, {
      totalCount: requests.length,
      updateRequests: requests,
    });
  } catch (error: any) {
    throw new Error(`Failed to list update requests: ${error.message}`);
  }
};
