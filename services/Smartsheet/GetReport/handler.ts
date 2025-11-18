import { GetReportInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetReportInputs>) => {
  const {
    reportId,
    include,
    exclude,
    pageSize,
    page,
    level,
    accessApiLevel,
    outputVariable,
  } = inputs;

  if (!reportId) {
    throw new Error('Report ID is required');
  }

  log(`Getting report ${reportId}`);

  try {
    const queryParams: Record<string, string | number> = {};
    if (include) {
      queryParams.include = include;
    }
    if (exclude) {
      queryParams.exclude = exclude;
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
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }

    const result = await smartsheetApiRequest({
      method: 'GET',
      path: `/reports/${reportId}`,
      queryParams,
    });
    log('Retrieved report successfully');
    setOutput(outputVariable, result);
  } catch (error: any) {
    throw new Error(`Failed to get report: ${error.message}`);
  }
};
