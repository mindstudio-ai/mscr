import axios from 'axios';

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
  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing Fireflies API key. Please check your service configuration.',
    );
  }

  // Extract inputs
  const {
    userId,
    includeBasicInfo,
    includeIntegrations,
    includeUserGroups,
    includeUsageStats,
    outputVariable,
  } = inputs;

  // Convert string boolean values to actual booleans
  const shouldIncludeBasicInfo = includeBasicInfo === 'true';
  const shouldIncludeIntegrations = includeIntegrations === 'true';
  const shouldIncludeUserGroups = includeUserGroups === 'true';
  const shouldIncludeUsageStats = includeUsageStats === 'true';

  // Build GraphQL query fields based on user selections
  let queryFields = [];

  if (shouldIncludeBasicInfo) {
    queryFields.push('user_id', 'name', 'email', 'is_admin');
  }

  if (shouldIncludeIntegrations) {
    queryFields.push('integrations');
  }

  if (shouldIncludeUsageStats) {
    queryFields.push(
      'minutes_consumed',
      'num_transcripts',
      'recent_transcript',
      'recent_meeting',
    );
  }

  let userGroupsField = '';
  if (shouldIncludeUserGroups) {
    userGroupsField = `
      user_groups {
        id
        name
        handle
        members {
          user_id
          first_name
          last_name
          email
        }
      }
    `;
    queryFields.push(userGroupsField);
  }

  // If no fields were selected, include basic info by default
  if (queryFields.length === 0) {
    queryFields.push('user_id', 'name', 'email');
    log(
      'No fields were selected, including basic user information by default.',
    );
  }

  // Remove the userGroupsField from the array if it exists, as it's already formatted
  const filteredQueryFields = queryFields.filter(
    (field) => field !== userGroupsField,
  );

  // Construct the GraphQL query
  const query = `
    query User($userId: String) {
      user(id: $userId) {
        ${filteredQueryFields.join('\n        ')}
        ${userGroupsField}
      }
    }
  `;

  const variables = { userId: userId || null };

  log(
    `Fetching user ${userId ? `with ID: ${userId}` : 'details for API key owner'}...`,
  );

  try {
    // Make the GraphQL request
    const response = await axios.post(
      'https://api.fireflies.ai/graphql',
      { query, variables },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    // Check for errors in the GraphQL response
    if (response.data.errors) {
      const errorMessage =
        response.data.errors[0]?.message || 'Unknown GraphQL error';
      const errorCode = response.data.errors[0]?.extensions?.code;

      if (errorCode === 'object_not_found') {
        throw new Error(`User not found: ${errorMessage}`);
      } else if (errorCode === 'not_in_team') {
        throw new Error(`User is not in your team: ${errorMessage}`);
      } else {
        throw new Error(`GraphQL error: ${errorMessage}`);
      }
    }

    // Extract user data from response
    const userData = response.data.data.user;

    if (!userData) {
      throw new Error('No user data returned from the API');
    }

    log('Successfully retrieved user details');

    // Set the output variable with the user data
    setOutput(outputVariable, userData);
  } catch (error) {
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message;

      if (statusCode === 401) {
        throw new Error('Authentication failed: Invalid API key');
      } else if (statusCode === 403) {
        throw new Error('Authorization failed: Insufficient permissions');
      } else {
        throw new Error(`API request failed (${statusCode}): ${errorMessage}`);
      }
    }

    // Re-throw other errors
    throw error;
  }
};
