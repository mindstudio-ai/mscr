import { ListSheetsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListSheetsInputs>) => {
  const {
    include,
    includeAll,
    modifiedSince,
    numericDates,
    page,
    pageSize,
    accessApiLevel,
    outputVariable,
  } = inputs;

  log('Retrieving list of sheets from Smartsheet');

  try {
    // Build query parameters
    const queryParams: Record<string, string | number | boolean> = {};

    if (include) {
      queryParams.include = include;
    }

    if (includeAll !== undefined) {
      queryParams.includeAll = includeAll;
    }

    if (modifiedSince) {
      queryParams.modifiedSince = modifiedSince;
    }

    if (numericDates !== undefined) {
      queryParams.numericDates = numericDates;
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

    // Get list of sheets
    const response = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
      pageNumber?: number;
      pageSize?: number;
      totalPages?: number;
    }>({
      method: 'GET',
      path: '/sheets',
      queryParams,
    });

    const data = (response as any).data || response;
    const totalCount = (response as any).totalCount || data.length;

    log(
      `Successfully retrieved ${Array.isArray(data) ? data.length : 0} sheets`,
    );

    // Set output variable
    setOutput(outputVariable, {
      totalCount,
      sheets: data,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';
    throw new Error(`Failed to list sheets: ${errorMessage}`);
  }
};
