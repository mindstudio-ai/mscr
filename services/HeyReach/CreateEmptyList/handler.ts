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
      'Missing API Key. Please check your HeyReach API Key configuration.',
    );
  }

  const { listName, listType, outputVariable } = inputs;

  if (!listName) {
    throw new Error('List name is required');
  }

  log(
    `Creating a new ${listType === 'COMPANY_LIST' ? 'company' : 'lead'} list named "${listName}"...`,
  );

  try {
    const response = await fetch(
      'https://api.heyreach.io/api/public/list/CreateEmptyList',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
        body: JSON.stringify({
          name: listName,
          type: listType,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.errorMessage ||
        `Request failed with status ${response.status}`;

      switch (response.status) {
        case 400:
          throw new Error(`Bad request: ${errorMessage}`);
        case 401:
          throw new Error('Unauthorized. Please check your API key.');
        case 404:
          throw new Error(
            'API endpoint not found. Please contact HeyReach support.',
          );
        case 429:
          throw new Error('Too many requests. Please try again later.');
        default:
          throw new Error(`Request failed: ${errorMessage}`);
      }
    }

    const data = await response.json();
    log(`Successfully created list "${data.name}" with ID ${data.id}`);

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error creating list: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
