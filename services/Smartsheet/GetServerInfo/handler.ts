import { GetServerInfoInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetServerInfoInputs>) => {
  const { outputVariable } = inputs;

  log('Getting server information');

  try {
    const response = await smartsheetApiRequest({
      method: 'GET',
      path: '/serverinfo',
    });
    log('Retrieved server information successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get server info: ${error.message}`);
  }
};
