import { CreateProofRequestInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: CreateProofRequestInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    sheetId,
    rowId,
    attachmentId,
    approverEmails,
    message,
    outputVariable,
  } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!rowId) {
    throw new Error('Row ID is required');
  }
  if (!attachmentId) {
    throw new Error('Attachment ID is required');
  }
  if (!approverEmails) {
    throw new Error('Approver emails are required');
  }

  log('Creating proof request');

  try {
    const emails = approverEmails.split(',').map((e: string) => e.trim());
    const approvers = emails.map((email: string) => ({ email }));

    const proofBody: any = {
      attachmentId,
      approvers,
    };
    if (message) {
      proofBody.message = message;
    }

    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/sheets/${sheetId}/rows/${rowId}/proofrequests`,
      body: proofBody,
    });
    log('Proof request created successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to create proof request: ${error.message}`);
  }
};
