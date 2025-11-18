import { UpdateSightInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateSightInputs>) => {
  const { sightId, name, numericDates, outputVariable } = inputs;

  if (!sightId) {
    throw new Error('Sight ID is required');
  }

  log(`Updating dashboard ${sightId}`);

  try {
    const queryParams: Record<string, boolean> = {};
    if (numericDates !== undefined) {
      queryParams.numericDates = numericDates;
    }

    const updateBody: any = {};
    if (name) {
      updateBody.name = name;
    }

    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/sights/${sightId}`,
      queryParams,
      body: updateBody,
    });
    log('Dashboard updated successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to update dashboard: ${error.message}`);
  }
};
