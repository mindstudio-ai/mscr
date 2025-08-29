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
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Canva connection settings.',
    );
  }

  const { brandTemplateId, outputVariable } = inputs;
  if (!brandTemplateId) {
    throw new Error('Brand Template ID is required');
  }

  log(`Retrieving dataset information for brand template: ${brandTemplateId}`);

  try {
    const response = await fetch(
      `https://api.canva.com/rest/v1/brand-templates/${brandTemplateId}/dataset`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Canva access token.',
        );
      } else if (response.status === 404) {
        throw new Error(
          `Brand template with ID "${brandTemplateId}" not found.`,
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Canva API error (${response.status}): ${errorText}`);
      }
    }

    const data = (await response.json()) as any;
    log('Successfully retrieved brand template dataset information');

    // Set the entire response as the output
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to retrieve brand template dataset: ${error.message}`,
      );
    } else {
      throw new Error(
        'An unknown error occurred while retrieving the brand template dataset',
      );
    }
  }
};
