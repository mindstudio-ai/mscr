import { ListFoldersInHomeInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListFoldersInHomeInputs>) => {
  const { includeall, page, pagesize, outputVariable } = inputs;
  const path = `/home/folders`;
  const queryParams: Record<string, string | number | boolean> = {};
  if (includeall !== undefined && includeall !== null) {
    queryParams['includeAll'] = includeall;
  }
  if (page !== undefined && page !== null) {
    queryParams['page'] = page;
  }
  if (pagesize !== undefined && pagesize !== null) {
    queryParams['pageSize'] = pagesize;
  }

  const requestOptions: Record<string, any> = {
    method: 'GET',
    path,
  };
  if (Object.keys(queryParams).length > 0) {
    requestOptions.queryParams = queryParams;
  }

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
