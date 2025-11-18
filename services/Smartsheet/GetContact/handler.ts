import { GetContactInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetContactInputs>) => {
  const { contactId, include, outputVariable } = inputs;

  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  log(`Getting contact ${contactId}`);

  try {
    const queryParams: Record<string, string> = {};
    if (include) {
      queryParams.include = include;
    }

    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/contacts/${contactId}`,
      queryParams,
    });
    log('Retrieved contact successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get contact: ${error.message}`);
  }
};
