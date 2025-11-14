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
  const { since, streamPosition, outputVariable } = inputs;

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log('Listing events');

  try {
    const queryParams: any = {};
    if (since) {
      queryParams.since = since;
    }
    if (streamPosition) {
      queryParams.streamPosition = streamPosition;
    }

    const response = await client.events.listEvents({
      queryParameters: queryParams,
    });
    log(`Found ${response.data?.length || 0} event(s)`);
    setOutput(outputVariable, {
      moreAvailable: response.moreAvailable,
      nextStreamPosition: response.nextStreamPosition,
      events: response.data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list events: ${error.message}`);
  }
};
