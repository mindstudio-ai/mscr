import smartsheet from 'smartsheet';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { outputVariable } = inputs;

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log('Listing all dashboards (sights)');

  try {
    const response = await client.sights.listSights();
    log(`Found ${response.totalCount || 0} dashboard(s)`);
    setOutput(outputVariable, {
      totalCount: response.totalCount,
      sights: response.data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list dashboards: ${error.message}`);
  }
};
