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
    throw new Error('Missing Typeform API token');
  }

  const {
    search,
    page,
    pageSize,
    workspaceId,
    sortBy,
    orderBy,
    outputVariable,
  } = inputs;

  // Build query parameters
  const queryParams = new URLSearchParams();

  if (search) {
    queryParams.append('search', search);
  }
  if (page) {
    queryParams.append('page', page);
  }
  if (pageSize) {
    queryParams.append('page_size', pageSize);
  }
  if (workspaceId) {
    queryParams.append('workspace_id', workspaceId);
  }
  if (sortBy) {
    queryParams.append('sort_by', sortBy);
  }
  if (orderBy) {
    queryParams.append('order_by', orderBy);
  }

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : '';
  const url = `https://api.typeform.com/forms${queryString}`;

  log(`Retrieving forms from Typeform${search ? ` matching "${search}"` : ''}`);

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
      throw new Error(`Typeform API error (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as any;

    log(
      `Successfully retrieved ${data.items.length} forms (${data.total_items} total)`,
    );

    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error retrieving forms: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
