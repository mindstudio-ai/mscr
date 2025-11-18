import { AddRowAttachmentInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: AddRowAttachmentInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, rowId, attachmentType, filePath, url, outputVariable } =
    inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!rowId) {
    throw new Error('Row ID is required');
  }
  if (attachmentType === 'LINK' && !url) {
    throw new Error('URL is required for LINK attachments');
  }
  if (attachmentType === 'FILE' && !filePath) {
    throw new Error('File path is required for FILE attachments');
  }

  log(`Adding ${attachmentType} attachment to row ${rowId}`);

  try {
    let response;
    if (attachmentType === 'LINK') {
      response = await smartsheetApiRequest({
        method: 'POST',
        path: `/sheets/${sheetId}/rows/${rowId}/attachments`,
        body: { attachmentType: 'LINK', url },
      });
    } else {
      response = await smartsheetApiRequest({
        method: 'POST',
        path: `/sheets/${sheetId}/rows/${rowId}/attachments`,
        multipart: true,
        filePath,
      });
    }
    log(`Successfully added attachment with ID: ${(response as any).id}`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to add row attachment: ${error.message}`);
  }
};
