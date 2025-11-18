import { SetReportPublishStatusInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<SetReportPublishStatusInputs>) => {
  const {
    reportId,
    readonlyfullaccessibleby,
    readonlyfulldefaultview,
    readonlyfullenabled,
    readonlyfullshowtoolbar,
    readonlyfullurl,
    outputVariable,
  } = inputs;
  if (!reportId) {
    throw new Error('reportId is required');
  }
  const path = `/reports/${reportId}/publish`;
  const body: Record<string, any> = {};
  if (readonlyfullaccessibleby !== undefined) {
    body['readOnlyFullAccessibleBy'] = readonlyfullaccessibleby;
  }
  if (readonlyfulldefaultview !== undefined) {
    body['readOnlyFullDefaultView'] = readonlyfulldefaultview;
  }
  if (readonlyfullenabled !== undefined) {
    body['readOnlyFullEnabled'] = readonlyfullenabled;
  }
  if (readonlyfullshowtoolbar !== undefined) {
    body['readOnlyFullShowToolbar'] = readonlyfullshowtoolbar;
  }
  if (readonlyfullurl !== undefined) {
    body['readOnlyFullUrl'] = readonlyfullurl;
  }

  const requestOptions: Record<string, any> = {
    method: 'PUT',
    path,
  };
  if (Object.keys(body).length > 0) {
    requestOptions.body = body;
  }

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
