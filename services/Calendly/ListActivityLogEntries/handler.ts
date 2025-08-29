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

  // Extract inputs with defaults
  const {
    count,
    pageToken,
    sort,
    action,
    actorUserUuid,
    namespace,
    organization,
    minCreatedAt,
    maxCreatedAt,
    outputVariable,
  } = inputs;

  // Build URL with query parameters
  const baseUrl = 'https://api.calendly.com/activity_log_entries';
  const queryParams = new URLSearchParams();

  // Add parameters only if they exist
  if (count) {
    queryParams.append('count', count);
  }
  if (pageToken) {
    queryParams.append('page_token', pageToken);
  }
  if (sort) {
    queryParams.append('sort', sort);
  }
  if (action) {
    queryParams.append('action', action);
  }
  if (actorUserUuid) {
    queryParams.append('actor_user_uuid', actorUserUuid);
  }
  if (namespace) {
    queryParams.append('namespace', namespace);
  }
  if (organization) {
    queryParams.append('organization', organization);
  }
  if (minCreatedAt) {
    queryParams.append('min_created_at', minCreatedAt);
  }
  if (maxCreatedAt) {
    queryParams.append('max_created_at', maxCreatedAt);
  }

  const url = `${baseUrl}?${queryParams.toString()}`;

  log('Fetching activity log entries from Calendly...');

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

      // Handle specific error cases
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Calendly API token.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Calendly API error (${response.status}): ${errorText}`,
        );
      }
    }

    const data = (await response.json()) as any;

    log(
      `Successfully retrieved ${data.collection.length} activity log entries`,
    );

    // If pagination is available, log it for user awareness
    if (data.pagination && data.pagination.next_page) {
      log(
        'More results are available. Use the page token in the response to fetch the next page.',
      );
    }

    setOutput(outputVariable, {
      collection: data.collection,
      pagination: data.pagination,
    });
  } catch (error) {
    // Handle network errors or other exceptions
    if (error instanceof Error) {
      throw new Error(`Failed to fetch activity log entries: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while fetching activity log entries',
      );
    }
  }
};
