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
  const { reportId, email, accessLevel, outputVariable } = inputs;

  if (!reportId) {
    throw new Error('Report ID is required');
  }
  if (!email) {
    throw new Error('Email address is required');
  }
  if (!accessLevel) {
    throw new Error('Access level is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Sharing report ${reportId} with ${email}`);

  try {
    const response = await client.reports.share({
      reportId,
      body: {
        email,
        accessLevel: accessLevel.toUpperCase(),
      },
    });
    log('Report shared successfully');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to share report: ${error.message}`);
  }
};
