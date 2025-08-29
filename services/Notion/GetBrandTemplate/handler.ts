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
      'Missing Canva access token. Please check your connection settings.',
    );
  }

  const { brandTemplateId, outputVariable } = inputs;
  if (!brandTemplateId) {
    throw new Error('Brand Template ID is required');
  }

  log(`Retrieving metadata for brand template: ${brandTemplateId}`);

  try {
    // Make the API request to Canva
    const response = await fetch(
      `https://api.canva.com/rest/v1/brand-templates/${brandTemplateId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      },
    );

    // Handle error responses
    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Canva access token.',
        );
      } else if (response.status === 403) {
        throw new Error(
          'You do not have permission to access this brand template. Make sure your token has the brandtemplate:meta:read scope.',
        );
      } else if (response.status === 404) {
        throw new Error(`Brand template with ID ${brandTemplateId} not found.`);
      } else if (response.status === 429) {
        throw new Error(
          'Rate limit exceeded. Please try again later (limit is 100 requests per minute per user).',
        );
      } else {
        throw new Error(`Canva API error (${response.status}): ${errorText}`);
      }
    }

    // Parse the response
    const data = (await response.json()) as any;

    log('Successfully retrieved brand template metadata');

    // Set the output variable with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`An unexpected error occurred: ${String(error)}`);
    }
  }
};
