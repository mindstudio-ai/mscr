import { UpdateShareInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: UpdateShareInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, shareId, accessLevel, accessApiLevel, outputVariable } =
    inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!shareId) {
    throw new Error('Share ID is required');
  }
  if (!accessLevel) {
    throw new Error('Access level is required');
  }

  log(`Updating share ${shareId}`);

  try {
    const queryParams: Record<string, number> = {};
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }

    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/sheets/${sheetId}/shares/${shareId}`,
      queryParams,
      body: { accessLevel: accessLevel.toUpperCase() },
    });
    log('Share updated successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to update share: ${error.message}`);
  }
};
