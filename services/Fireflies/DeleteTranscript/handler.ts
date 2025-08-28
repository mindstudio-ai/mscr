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
  // Extract inputs
  const { transcriptId, outputVariable } = inputs;
  const { apiKey } = process.env;

  // Validate required inputs
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please check your Fireflies.ai connection settings.',
    );
  }

  if (!transcriptId) {
    throw new Error('Transcript ID is required.');
  }

  log(`Preparing to delete transcript with ID: ${transcriptId}`);

  // GraphQL query for deleting a transcript
  const graphqlQuery = {
    query: `
      mutation($transcriptId: String!) {
        deleteTranscript(id: $transcriptId) {
          id
          title
          host_email
          organizer_email
          fireflies_users
          participants
          date
          transcript_url
          audio_url
          duration
        }
      }
    `,
    variables: { transcriptId },
  };

  try {
    // Make the API request
    log('Sending delete request to Fireflies.ai...');

    const response = await axios.post(
      'https://api.fireflies.ai/graphql',
      graphqlQuery,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    // Check for errors in the response
    if (response.data.errors) {
      const errorMessage =
        response.data.errors[0]?.message || 'Unknown error occurred';
      const errorCode = response.data.errors[0]?.extensions?.code || '';

      if (errorCode === 'require_elevated_privilege') {
        throw new Error(
          'Permission denied: Your API key does not have sufficient privileges to delete transcripts.',
        );
      }

      throw new Error(`API Error: ${errorMessage}`);
    }

    // Extract the deleted transcript data
    const deletedTranscript = response.data.data.deleteTranscript;

    if (!deletedTranscript) {
      throw new Error('No data returned for the deleted transcript.');
    }

    log(
      `Successfully deleted transcript: "${deletedTranscript.title || 'Untitled'}"`,
    );

    // Format date if available
    if (deletedTranscript.date) {
      deletedTranscript.formattedDate = new Date(
        deletedTranscript.date,
      ).toLocaleString();
    }

    // Set the output variable
    setOutput(outputVariable, deletedTranscript);
  } catch (error) {
    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (error.response?.status === 404) {
        throw new Error(`Transcript with ID "${transcriptId}" not found.`);
      } else {
        const statusCode = error.response?.status || 'unknown';
        const errorMessage =
          error.response?.data?.message || error.message || 'Unknown error';
        throw new Error(`API request failed (${statusCode}): ${errorMessage}`);
      }
    }

    // Re-throw the error if it's not an Axios error
    throw error;
  }
};
