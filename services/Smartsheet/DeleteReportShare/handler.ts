import { DeleteReportShareInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteReportShareInputs>) => {
  const { reportId, shareId, accessapilevel, outputVariable } = inputs;
  if (!reportId) {
    throw new Error('reportId is required');
  }
  if (!shareId) {
    throw new Error('shareId is required');
  }
  const path = `/reports/${reportId}/shares/${shareId}`;
  const queryParams: Record<string, string | number | boolean> = {};
  if (accessapilevel !== undefined && accessapilevel !== null) {
    queryParams['accessApiLevel'] = accessapilevel;
  }

  const requestOptions: Record<string, any> = {
    method: 'DELETE',
    path,
  };
  if (Object.keys(queryParams).length > 0) {
    requestOptions.queryParams = queryParams;
  }

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
