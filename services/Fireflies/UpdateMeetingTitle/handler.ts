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
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing Fireflies API Key. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { transcriptId, newTitle, outputVariable } = inputs;

  // Validate required inputs
  if (!transcriptId) {
    throw new Error('Transcript ID is required');
  }

  if (!newTitle) {
    throw new Error('New title is required');
  }

  log(`Updating title for transcript ID: ${transcriptId}`);

  // Prepare the GraphQL mutation
  const query = `
    mutation($input: UpdateMeetingTitleInput!) {
      updateMeetingTitle(input: $input) {
        title
      }
    }
  `;

  // Prepare variables for the mutation
  const variables = {
    input: {
      id: transcriptId,
      title: newTitle,
    },
  };

  try {
    // Make the GraphQL request to Fireflies API
    const response = await fetch('https://api.fireflies.ai/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    // Parse the response
    const responseData = await response.json();

    // Check for GraphQL errors
    if (responseData.errors) {
      const errorMessage =
        responseData.errors[0]?.message || 'Unknown GraphQL error';
      const errorCode = responseData.errors[0]?.extensions?.code;

      if (errorCode === 'require_elevated_privilege') {
        throw new Error(
          'You do not have admin privileges to update meeting titles',
        );
      } else if (errorCode === 'object_not_found') {
        throw new Error(
          'The specified transcript could not be found or you do not have access to it',
        );
      } else {
        throw new Error(`Error updating meeting title: ${errorMessage}`);
      }
    }

    // Extract the updated title from the response
    const updatedTitle = responseData.data?.updateMeetingTitle?.title;

    if (!updatedTitle) {
      throw new Error(
        'Failed to update meeting title: No title returned in response',
      );
    }

    log(`Successfully updated meeting title to: "${updatedTitle}"`);

    // Set the output variable with the updated title information
    setOutput(outputVariable, {
      transcriptId,
      title: updatedTitle,
    });
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      throw new Error(`Failed to update meeting title: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while updating the meeting title',
      );
    }
  }
};
