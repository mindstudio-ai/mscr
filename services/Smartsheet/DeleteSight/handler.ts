import { DeleteSightInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteSightInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
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
