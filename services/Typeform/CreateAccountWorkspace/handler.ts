export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract the bearer token from environment variables
  const token = process.env.token;
  if (!token) {
    throw new Error(
      'Authentication token is missing. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { accountId, workspaceName, outputVariable } = inputs;

  // Validate required inputs
  if (!accountId) {
    throw new Error('Account ID is required');
  }

  if (!workspaceName) {
    throw new Error('Workspace name is required');
  }

  // Prepare request body
  const requestBody = {
    name: workspaceName,
  };

  log(`Creating workspace "${workspaceName}" in account ${accountId}...`);

  try {
    // Make API request to create workspace
    const response = await fetch(
      `https://api.typeform.com/accounts/${accountId}/workspaces`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    // Handle HTTP errors
    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API token.');
      } else if (response.status === 403) {
        throw new Error(
          "You don't have permission to create workspaces in this account.",
        );
      } else if (response.status === 404) {
        throw new Error(`Account with ID "${accountId}" not found.`);
      } else {
        throw new Error(
          `Failed to create workspace: ${response.status} ${errorText}`,
        );
      }
    }

    // Parse response
    const workspaceData = (await response.json()) as any;

    log(
      `Workspace "${workspaceData.name}" created successfully with ID: ${workspaceData.id}`,
    );

    // Set output variable with workspace data
    setOutput(outputVariable, workspaceData);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      throw new Error(`Error creating workspace: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while creating the workspace');
    }
  }
};
