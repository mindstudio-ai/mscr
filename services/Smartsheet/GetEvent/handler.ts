import smartsheet from 'smartsheet';
import { GetEventInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetEventInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { eventId, outputVariable } = inputs;

  if (!eventId) {
    throw new Error('Event ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Getting event ${eventId}`);

  try {
    const response = await client.events.getEvent({ eventId });
    log('Retrieved event successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get event: ${error.message}`);
  }
};
