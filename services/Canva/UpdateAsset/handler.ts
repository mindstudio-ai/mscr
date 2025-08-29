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

  const { assetId, name, tags, outputVariable } = inputs;

  if (!assetId) {
    throw new Error('Asset ID is required');
  }

  // Prepare request body
  const requestBody: Record<string, any> = {};

  // Only include name if provided
  if (name) {
    if (name.length > 50) {
      throw new Error('Asset name cannot exceed 50 characters');
    }
    requestBody.name = name;
  }

  // Process tags if provided
  if (tags) {
    const tagArray = tags
      .split(',')
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag.length > 0);

    if (tagArray.length > 50) {
      throw new Error('Cannot exceed 50 tags');
    }

    requestBody.tags = tagArray;
  }

  // If neither name nor tags provided, inform the user
  if (Object.keys(requestBody).length === 0) {
    log('No updates provided. Please specify a new name or tags to update.');
    throw new Error(
      'No updates provided. Please specify a new name or tags to update.',
    );
  }

  log(`Updating asset ${assetId}...`);

  try {
    const response = await fetch(
      `https://api.canva.com/rest/v1/assets/${assetId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Canva connection settings.',
        );
      } else if (response.status === 404) {
        throw new Error(`Asset with ID ${assetId} not found.`);
      } else if (response.status === 429) {
        throw new Error(
          'Rate limit exceeded. Canva allows 30 requests per minute per user.',
        );
      } else {
        throw new Error(
          `Failed to update asset: ${response.status} ${errorText}`,
        );
      }
    }

    const result = (await response.json()) as any;

    log(`Successfully updated asset ${assetId}`);

    // Set the output variable with the full response
    setOutput(outputVariable, result);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred');
  }
};
