import { GetCellHistoryInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetCellHistoryInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    sheetId,
    rowId,
    columnId,
    include,
    pageSize,
    page,
    level,
    outputVariable,
  } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!rowId) {
    throw new Error('Row ID is required');
  }
  if (!columnId) {
    throw new Error('Column ID is required');
  }

  log(`Getting cell history for cell in row ${rowId}, column ${columnId}`);

  try {
    const queryParams: Record<string, string | number> = {};
    if (include) {
      queryParams.include = include;
    }
    if (pageSize !== undefined) {
      queryParams.pageSize = pageSize;
    }
    if (page !== undefined) {
      queryParams.page = page;
    }
    if (level !== undefined) {
      queryParams.level = level;
    }

    const response = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: `/sheets/${sheetId}/rows/${rowId}/columns/${columnId}/history`,
      queryParams,
    });
    const data = (response as any).data || response;
    const totalCount =
      (response as any).totalCount || (Array.isArray(data) ? data.length : 0);
    log(`Retrieved ${Array.isArray(data) ? data.length : 0} history item(s)`);
    setOutput(outputVariable, {
      totalCount,
      history: data,
    });
  } catch (error: any) {
    throw new Error(`Failed to get cell history: ${error.message}`);
  }
};
