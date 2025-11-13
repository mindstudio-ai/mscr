export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Blotato API key in the connector settings.',
    );
  }

  const { mediaUrl, outputVariable } = inputs;

  if (!mediaUrl) {
    throw new Error('Media URL is required');
  }

  log(`Uploading media from URL: ${mediaUrl}`);

  try {
    const response = await fetch('https://backend.blotato.com/v2/media', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url: mediaUrl,
      }),
    });

    if (!response.ok) {
      // Handle rate limiting specifically
      if (response.status === 429) {
        const errorData = (await response.json()) as { message: string };
        throw new Error(
          `Rate limit exceeded: ${errorData.message || 'Try again later (limit is 10 requests per minute)'}`,
        );
      }

      // Handle other errors
      const errorText = await response.text();
      throw new Error(
        `Upload failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = (await response.json()) as { url: string };

    if (!data.url) {
      throw new Error('No media URL returned from Blotato');
    }

    log(`Media successfully uploaded. New URL created.`);
    setOutput(outputVariable, data.url);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error uploading media: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
