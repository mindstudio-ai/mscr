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

  const { workspaceName, outputVariable } = inputs;

  log(`Creating new workspace: "${workspaceName}"`);

  try {
    // Make API request to create workspace
    const response = await fetch('https://api.typeform.com/workspaces', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: workspaceName,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to create workspace: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    const workspaceData = (await response.json()) as any;

    log(
      `Successfully created workspace "${workspaceName}" with ID: ${workspaceData.id}`,
    );

    // Set the output variable with the workspace data
    setOutput(outputVariable, workspaceData);
  } catch (error) {
    log(
      `Error creating workspace: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
