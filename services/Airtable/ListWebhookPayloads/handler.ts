export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing authentication token');
  }

  const { baseId, webhookId, cursor, limit, outputVariable } = inputs;

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!webhookId) {
    throw new Error('Webhook ID is required');
  }

  // Build URL with optional query parameters
  let url = `https://api.airtable.com/v0/bases/${baseId}/webhooks/${webhookId}/payloads`;

  const queryParams = new URLSearchParams();
  if (cursor) {
    queryParams.append('cursor', cursor);
  }
  if (limit) {
    queryParams.append('limit', limit);
  }

  const queryString = queryParams.toString();
  if (queryString) {
    url = `${url}?${queryString}`;
  }

  log(`Fetching webhook payloads from Airtable...`);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Airtable API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    log(
      `Successfully retrieved ${data.payloads?.length || 0} webhook payloads`,
    );

    if (data.mightHaveMore) {
      log(
        `There might be more payloads available. Use cursor value ${data.cursor} for the next request.`,
      );
    }

    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error fetching webhook payloads: ${error.message}`);
    throw error;
  }
};
