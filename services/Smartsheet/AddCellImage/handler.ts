import smartsheet from 'smartsheet';
import { AddCellImageInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: AddCellImageInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, rowId, columnId, imageId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!rowId) {
    throw new Error('Row ID is required');
  }
  if (!columnId) {
    throw new Error('Column ID is required');
  }
  if (!imageId) {
    throw new Error('Image ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Adding image ${imageId} to cell`);

  try {
    const response = await client.sheets.addImageToCell({
      sheetId,
      rowId,
      columnId,
      body: { imageId },
    });
    log('Successfully added image to cell');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to add cell image: ${error.message}`);
  }
};
