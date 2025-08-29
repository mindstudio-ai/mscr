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
      'Missing Canva API token. Please check your connection settings.',
    );
  }

  const { searchTerm, ownership, sortBy, continuation, outputVariable } =
    inputs;

  // Build the query parameters
  const queryParams = new URLSearchParams();

  if (searchTerm) {
    queryParams.append('q', searchTerm);
    log(`Searching for designs matching: "${searchTerm}"`);
  }

  if (ownership) {
    queryParams.append('ownership', ownership);
    log(`Filtering by ownership: ${ownership}`);
  }

  if (sortBy) {
    queryParams.append('sort', sortBy);
    log(`Sorting results by: ${sortBy}`);
  }

  if (continuation) {
    queryParams.append('continuation', continuation);
    log('Fetching next page of results using continuation token');
  }

  // Construct the full URL with query parameters
  const queryString = queryParams.toString();
  const url = `https://api.canva.com/rest/v1/designs${queryString ? `?${queryString}` : ''}`;

  log('Fetching designs from Canva...');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Canva API token.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Canva API error (${response.status}): ${errorText}`);
      }
    }

    const data = (await response.json()) as {
      items: Array<{
        id: string;
        title: string;
        thumbnail: {
          url: string;
          width: number;
          height: number;
        };
        urls: {
          edit_url: string;
          view_url: string;
        };
        created_at: number;
        updated_at: number;
        page_count?: number;
      }>;
      continuation?: string;
    };

    const designCount = data.items?.length || 0;
    log(`Successfully retrieved ${designCount} designs`);

    if (data.continuation) {
      log(
        'More designs are available. Use the continuation token to fetch the next page.',
      );
    }

    // Set the output with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any errors that occur during the API call
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while fetching designs from Canva',
    );
  }
};
