import { GetReportPublishSettingsInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetReportPublishSettingsInputs>) => {
  const { reportId, outputVariable } = inputs;
  if (!reportId) {
    throw new Error('reportId is required');
  }
  const path = `/reports/${reportId}/publish`;

  const requestOptions: Record<string, any> = {
    method: 'GET',
    path,
  };

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
