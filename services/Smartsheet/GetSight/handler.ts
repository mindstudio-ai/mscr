import { GetSightInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetSightInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    sightId,
    accessApiLevel,
    include,
    level,
    numericDates,
    outputVariable,
  } = inputs;

  if (!sightId) {
    throw new Error('Sight ID is required');
  }

  log(`Getting dashboard ${sightId}`);

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }
    if (include) {
      queryParams.include = include;
    }
    if (level !== undefined) {
      queryParams.level = level;
    }
    if (numericDates !== undefined) {
      queryParams.numericDates = numericDates;
    }

    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sights/${sightId}`,
      queryParams,
    });
    log('Retrieved dashboard successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get dashboard: ${error.message}`);
  }
};
