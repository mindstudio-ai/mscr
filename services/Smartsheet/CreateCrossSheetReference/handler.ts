import smartsheet from 'smartsheet';
import { CreateCrossSheetReferenceInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: CreateCrossSheetReferenceInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    sheetId,
    name,
    sourceSheetId,
    startRowId,
    endRowId,
    startColumnId,
    endColumnId,
    outputVariable,
  } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!name) {
    throw new Error('Reference name is required');
  }
  if (!sourceSheetId) {
    throw new Error('Source Sheet ID is required');
  }
  if (!startRowId) {
    throw new Error('Start Row ID is required');
  }
  if (!endRowId) {
    throw new Error('End Row ID is required');
  }
  if (!startColumnId) {
    throw new Error('Start Column ID is required');
  }
  if (!endColumnId) {
    throw new Error('End Column ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Creating cross-sheet reference: ${name}`);

  try {
    const response = await client.sheets.createCrossSheetReference({
      sheetId,
      body: {
        name,
        sourceSheetId: parseInt(sourceSheetId, 10),
        startRowId: parseInt(startRowId, 10),
        endRowId: parseInt(endRowId, 10),
        startColumnId: parseInt(startColumnId, 10),
        endColumnId: parseInt(endColumnId, 10),
      },
    });
    log('Cross-sheet reference created successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to create cross-sheet reference: ${error.message}`);
  }
};
