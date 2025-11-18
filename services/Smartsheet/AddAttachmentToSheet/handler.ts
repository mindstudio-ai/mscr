import { AddAttachmentToSheetInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<AddAttachmentToSheetInputs>) => {
  const { sheetId, attachmentType, filePath, url, name, outputVariable } =
    inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  if (attachmentType === 'LINK' && !url) {
    throw new Error('URL is required for LINK attachments');
  }

  if (attachmentType === 'FILE' && !filePath) {
    throw new Error('File path is required for FILE attachments');
  }

  log(`Adding ${attachmentType} attachment to sheet: ${sheetId}`);

  try {
    let response;

    if (attachmentType === 'LINK') {
      response = await smartsheetApiRequest({
        method: 'POST',
        path: `/sheets/${sheetId}/attachments`,
        body: {
          attachmentType: 'LINK',
          url,
          name: name || url,
        },
      });
    } else {
      response = await smartsheetApiRequest({
        method: 'POST',
        path: `/sheets/${sheetId}/attachments`,
        multipart: true,
        filePath,
        fileName: name,
      });
    }

    log(`Successfully added attachment with ID: ${(response as any).id}`);

    setOutput(outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      throw new Error(`Sheet not found: ${sheetId}`);
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Permission')
    ) {
      throw new Error('Permission denied. Editor access required.');
    } else {
      throw new Error(`Failed to add attachment: ${errorMessage}`);
    }
  }
};
