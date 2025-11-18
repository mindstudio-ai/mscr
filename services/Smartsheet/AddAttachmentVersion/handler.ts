import { AddAttachmentVersionInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<AddAttachmentVersionInputs>) => {
  const { sheetId, attachmentId, filePath, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!attachmentId) {
    throw new Error('Attachment ID is required');
  }
  if (!filePath) {
    throw new Error('File path is required');
  }

  log(`Adding new version to attachment ${attachmentId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/attachments/${attachmentId}/versions`,
      multipart: true,
      filePath,
    });
    log(`Successfully added new version with ID: ${(response as any).id}`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to add version: ${error.message}`);
  }
};
