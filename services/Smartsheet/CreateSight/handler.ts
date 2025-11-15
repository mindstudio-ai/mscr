import smartsheet from 'smartsheet';
import { CreateSightInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: CreateSightInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { name, outputVariable } = inputs;

  if (!name) {
    throw new Error('Dashboard name is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Creating dashboard: ${name}`);

  try {
    const response = await client.sights.createSight({
      body: { name },
    });
    log('Dashboard created successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to create dashboard: ${error.message}`);
  }
};
