import { DeleteSightInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteSightInputs>) => {
  const { sightId, outputVariable } = inputs;

  if (!sightId) {
    throw new Error('Sight ID is required');
  }

  log(`Deleting dashboard ${sightId}`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/sights/${sightId}`,
    });
    log('Dashboard deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedSightId: sightId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete dashboard: ${error.message}`);
  }
};
