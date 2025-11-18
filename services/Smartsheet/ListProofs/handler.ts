import { ListProofsInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListProofsInputs>) => {
  const { sheetId, page, pageSize, includeAll, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Listing proofs for sheet ${sheetId}`);

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

    const result = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: `/sheets/${sheetId}/proofs`,
      queryParams,
    });
    const data = (result as any).data || result;
    const totalCount =
      (result as any).totalCount || (Array.isArray(data) ? data.length : 0);
    log(`Fetched ${totalCount} proof(s) successfully`);
    setOutput(outputVariable, {
      totalCount,
      proofs: data,
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch proofs: ${error.message}`);
  }
};
