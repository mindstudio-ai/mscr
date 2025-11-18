import { PublishSheetInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: PublishSheetInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, readOnlyLiteEnabled, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Publishing sheet ${sheetId}`);

  try {
    const publishBody: any = {
      readOnlyLiteEnabled: readOnlyLiteEnabled === 'false' ? false : true,
    };

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/publish`,
      body: publishBody,
    });
    log('Sheet published successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to publish sheet: ${error.message}`);
  }
};
