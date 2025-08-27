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
      'Missing API Key. Please add your Beehiiv API key in the connector settings.',
    );
  }

  const { publicationId, segmentId, includeStats, outputVariable } = inputs;

  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!segmentId) {
    throw new Error('Segment ID is required');
  }

  // Construct the URL with optional query parameters
  let url = `https://api.beehiiv.com/v2/publications/${publicationId}/segments/${segmentId}`;

  // Add expand[] query parameter if includeStats is true
  if (includeStats === 'true') {
    url += '?expand[]=stats';
  }

  log(
    `Fetching segment information for segment ${segmentId} in publication ${publicationId}`,
  );

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(
          'Segment or publication not found. Please check your IDs and try again.',
        );
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else if (response.status === 500) {
        throw new Error('Beehiiv server error. Please try again later.');
      } else {
        throw new Error(
          `Request failed with status ${response.status}: ${response.statusText}`,
        );
      }
    }

    const data = await response.json();

    log('Successfully retrieved segment information');

    // Set the output variable with the segment data
    setOutput(outputVariable, data.data);
  } catch (error) {
    // Re-throw any errors that weren't handled above
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`An unexpected error occurred: ${String(error)}`);
  }
};
