import { ResetSharedSecretInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ResetSharedSecretInputs>) => {
  const { webhookId, outputVariable } = inputs;
  if (!webhookId) {
    throw new Error('webhookId is required');
  }
  const path = `/webhooks/${webhookId}/resetSharedSecret`;

  const requestOptions: Record<string, any> = {
    method: 'POST',
    path,
  };

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
