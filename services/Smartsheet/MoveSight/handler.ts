import { MoveSightInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<MoveSightInputs>) => {
  const { sightId, destinationType, destinationId, outputVariable } = inputs;

  if (!sightId) {
    throw new Error('Sight ID is required');
  }
  if (!destinationType) {
    throw new Error('Destination type is required');
  }

  log(`Moving dashboard ${sightId} to ${destinationType}`);

  try {
    const moveBody: any = {
      destinationType: destinationType.toLowerCase(),
    };
    if (destinationId && destinationType.toLowerCase() !== 'home') {
      moveBody.destinationId = parseInt(destinationId, 10);
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sights/${sightId}/move`,
      body: moveBody,
    });
    log('Dashboard moved successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to move dashboard: ${error.message}`);
  }
};
