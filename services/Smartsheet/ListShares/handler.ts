import { ListSharesInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListSharesInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    sheetId,
    sharingInclude,
    includeAll,
    page,
    pageSize,
    accessApiLevel,
    outputVariable,
  } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Listing shares for sheet ${sheetId}`);

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    if (sharingInclude) {
      queryParams.sharingInclude = sharingInclude;
    }
    if (includeAll !== undefined) {
      queryParams.includeAll = includeAll;
    }
    if (page !== undefined) {
      queryParams.page = page;
    }
    if (pageSize !== undefined) {
      queryParams.pageSize = pageSize;
    }
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }

    const response = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: `/sheets/${sheetId}/shares`,
      queryParams,
    });
    const data = (response as any).data || response;
    const shares = Array.isArray(data) ? data : [];
    log(`Found ${shares.length} share(s)`);
    setOutput(outputVariable, {
      totalCount: shares.length,
      shares,
    });
  } catch (error: any) {
    throw new Error(`Failed to list shares: ${error.message}`);
  }
};
