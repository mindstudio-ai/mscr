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
    throw new Error('Missing authentication token');
  }

  const {
    routingFormUuid,
    count = '10',
    sort = 'created_at:desc',
    pageToken,
    outputVariable,
  } = inputs;

  if (!routingFormUuid) {
    throw new Error('Routing Form UUID is required');
  }

  // Build the query parameters
  const queryParams = new URLSearchParams({
    routing_form: routingFormUuid,
    count: count.toString(),
  });

  if (sort) {
    queryParams.append('sort', sort);
  }

  if (pageToken) {
    queryParams.append('page_token', pageToken);
  }

  log(`Fetching routing form submissions for form: ${routingFormUuid}`);

  try {
    const response = await fetch(
      `https://api.calendly.com/routing_form_submissions?${queryParams.toString()}`,
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
      throw new Error(
        `API request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = (await response.json()) as any;

    log(
      `Successfully retrieved ${data.collection.length} routing form submissions`,
    );

    // Format the output to be more user-friendly
    const result = {
      submissions: data.collection,
      pagination: {
        count: data.pagination.count,
        hasMore: data.pagination.next_page !== null,
        nextPageToken: data.pagination.next_page_token || null,
      },
    };

    setOutput(outputVariable, result);
  } catch (error) {
    log(`Error fetching routing form submissions: ${(error as Error).message}`);
    throw error;
  }
};
