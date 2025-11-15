import smartsheet from 'smartsheet';
import { ImportCSVToSheetInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ImportCSVToSheetInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { fileUrl, sheetName, headerRowIndex, outputVariable } = inputs;

  if (!fileUrl) {
    throw new Error('File URL is required');
  }
  if (!sheetName) {
    throw new Error('Sheet name is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Importing CSV file: ${fileUrl}`);

  try {
    const importOptions: any = {
      type: 'csv',
      file: fileUrl,
      sheetName,
    };
    if (headerRowIndex !== undefined) {
      importOptions.headerRowIndex = parseInt(headerRowIndex, 10);
    }

    const response = await client.sheets.importSheet(importOptions);
    log('CSV imported successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to import CSV: ${error.message}`);
  }
};
