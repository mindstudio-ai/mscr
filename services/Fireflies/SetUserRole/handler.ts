import fetch from 'node-fetch';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing Fireflies.ai API Key. Please configure the API Key in the connector settings.',
    );
  }

  // Extract inputs
  const { userId, role, outputVariable } = inputs;

  // Validate required inputs
  if (!userId) {
    throw new Error('User ID is required');
  }

  if (!role) {
    throw new Error('Role is required');
  }

  log(`Setting user ${userId} role to ${role}...`);

  // GraphQL query for setting user role
  const query = `
    mutation Mutation($userId: String!, $role: Role!) {
      setUserRole(user_id: $userId, role: $role) {
        name
        is_admin
      }
    }
  `;

  // Prepare request
  const url = 'https://api.fireflies.ai/graphql';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  const requestBody = {
    query,
    variables: {
      userId,
      role,
    },
  };

  try {
    // Make GraphQL request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    // Parse response
    const result = (await response.json()) as any;

    // Check for GraphQL errors
    if (result.errors) {
      const errorMessage = result.errors[0]?.message || 'Unknown GraphQL error';
      const errorCode = result.errors[0]?.extensions?.code || '';

      // Handle specific error codes
      if (errorCode === 'object_not_found') {
        throw new Error(`User or team not found: ${errorMessage}`);
      } else if (errorCode === 'not_in_team') {
        throw new Error(`User is not in the team: ${errorMessage}`);
      } else if (errorCode === 'require_elevated_privilege') {
        throw new Error(`Insufficient permissions: ${errorMessage}`);
      } else if (errorCode === 'admin_must_exist') {
        throw new Error(
          `At least one admin must exist in the team: ${errorMessage}`,
        );
      } else if (errorCode === 'invalid_args') {
        throw new Error(`Invalid arguments: ${errorMessage}`);
      } else {
        throw new Error(`Error setting user role: ${errorMessage}`);
      }
    }

    // Check if the data exists in the response
    if (!result.data?.setUserRole) {
      throw new Error('No data returned from Fireflies.ai API');
    }

    const userData = result.data.setUserRole;

    log(
      `Successfully updated user role. User: ${userData.name}, Admin status: ${userData.is_admin}`,
    );

    // Set output
    setOutput(outputVariable, userData);
  } catch (error) {
    // Handle network or other errors
    if (error instanceof Error) {
      throw new Error(`Failed to set user role: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while setting user role');
    }
  }
};
