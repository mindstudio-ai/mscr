import { SetDashboardPublishStatusInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<SetDashboardPublishStatusInputs>) => {
  const {
    sightId,
    readonlyfullenabled,
    readonlyfullaccessibleby,
    readonlyfullurl,
    outputVariable,
  } = inputs;
  if (!sightId) {
    throw new Error('sightId is required');
  }
  const path = `/sights/${sightId}/publish`;
  const body: Record<string, any> = {};
  if (readonlyfullenabled !== undefined) {
    body['readOnlyFullEnabled'] = readonlyfullenabled;
  }
  if (readonlyfullaccessibleby !== undefined) {
    body['readOnlyFullAccessibleBy'] = readonlyfullaccessibleby;
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
