export const handler = async ({
  inputs,
  setOutput,
  log,
  uploadFile,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your EyePop.ai API key in the service settings.',
    );
  }

  const { contentUrl, contentType, popId, outputVariable } = inputs;

  // Validate required inputs
  if (!contentUrl) {
    throw new Error('Content URL is required');
  }

  if (!popId) {
    throw new Error('Pop ID is required');
  }

  log(`Starting analysis of ${contentType} content using EyePop.ai...`);

  try {
    let accessToken = '';

    try {
      //encodeURIComponent
      const body = JSON.stringify({
        secret_key: apiKey,
      });
      const url = `https://api.eyepop.ai/authentication/token`;

      const headers = {
        'Content-Type': 'application/json',
      };

      const request = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });

      const data = await request.json();

      accessToken = data.access_token;

      if (!accessToken) {
        throw new Error('Access token is invalid');
      }
    } catch (e) {
      const errorMessage = 'ERROR. Unable to get the access token';
      log(errorMessage);
      log(e.toString());
      setOutput(outputVariable, errorMessage);
      return;
    }

    let popConfig = {};

    try {
      const url =
        'https://api.eyepop.ai/pops/' + popId + '/config?auto_start=true';

      log('Loading PopConfig...');

      const request = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await request.json();
      popConfig = data;
    } catch (e) {
      const errorMessage = 'ERROR. Unable to fetch the pop_config';
      log(errorMessage);
      log(e.toString());
      setOutput(outputVariable, errorMessage);
      return;
    }

    // Get Analysis
    let outputResult = '';
    try {
      //ai.crmLog(popConfig)
      const url =
        (popConfig as any).base_url +
        '/pipelines/' +
        (popConfig as any).pipeline_id +
        '/source?mode=preempt&processing=sync';
      const body = JSON.stringify({
        sourceType: 'URL',
        url: contentUrl,
      });

      log('Analyzing...');

      const request = await fetch(url, {
        method: 'PATCH',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await request.json();
      outputResult = data;
    } catch (e) {
      const errorMessage = 'ERROR. Unable to fetch the image json';
      log(errorMessage);
      log(e.toString());

      setOutput(outputVariable, errorMessage);
      return;
    }

    log(`Successfully analyzed ${contentType} content with EyePop.ai`);

    // Set the output variable with the analysis results
    setOutput(outputVariable, outputResult);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error analyzing content: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred during analysis');
  }
};
