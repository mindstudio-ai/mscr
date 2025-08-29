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
    throw new Error(
      'Missing authentication token. Please check your connection settings.',
    );
  }

  const { workspaceId, outputVariable } = inputs;
  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  log(`Retrieving workspace information for workspace ID: ${workspaceId}`);

  try {
    const response = await fetch(
      `https://api.typeform.com/workspaces/${workspaceId}`,
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
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your token.');
      } else if (response.status === 403) {
        throw new Error("You don't have permission to access this workspace.");
      } else if (response.status === 404) {
        throw new Error(`Workspace with ID '${workspaceId}' not found.`);
      } else {
        throw new Error(
          `Failed to retrieve workspace: ${response.status} ${errorText}`,
        );
      }
    }

    const workspaceData = (await response.json()) as any;
    log(`Successfully retrieved workspace: ${workspaceData.name}`);

    // Set the output variable with the workspace data
    setOutput(outputVariable, workspaceData);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
