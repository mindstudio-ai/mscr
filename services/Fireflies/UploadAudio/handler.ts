import axios from 'axios';

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
      'Missing API Key. Please configure your Fireflies.ai API key in the connector settings.',
    );
  }

  // Extract inputs
  const {
    url,
    title,
    custom_language,
    save_video,
    client_reference_id,
    bypass_size_check,
    attendees,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!url) {
    throw new Error('Audio URL is required');
  }

  if (!url.startsWith('https://')) {
    throw new Error('Audio URL must be a secure HTTPS URL');
  }

  if (!title) {
    throw new Error('Meeting title is required');
  }

  // Prepare the GraphQL mutation input
  const uploadInput: Record<string, any> = {
    url,
    title,
  };

  // Add optional parameters if they exist
  if (custom_language) {
    uploadInput.custom_language = custom_language;
  }

  if (save_video === 'true') {
    uploadInput.save_video = true;
  }

  if (client_reference_id) {
    uploadInput.client_reference_id = client_reference_id;
  }

  if (bypass_size_check === 'true') {
    uploadInput.bypass_size_check = true;
  }

  // Parse and add attendees if provided
  if (attendees && Array.isArray(attendees) && attendees.length > 0) {
    uploadInput.attendees = attendees;
  }

  // Prepare the GraphQL mutation
  const graphqlQuery = {
    query: `
      mutation($input: AudioUploadInput) {
        uploadAudio(input: $input) {
          success
          title
          message
        }
      }
    `,
    variables: { input: uploadInput },
  };

  log(`Uploading audio file from ${url} to Fireflies.ai...`);

  try {
    // Make the API request
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

    // Check for errors in the GraphQL response
    if (response.data.errors) {
      const errorMessage =
        response.data.errors[0]?.message || 'Unknown GraphQL error';
      throw new Error(`Fireflies.ai API error: ${errorMessage}`);
    }

    const result = response.data.data.uploadAudio;

    log(`Upload successful: ${result.message}`);

    // Set the output variable with the result
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const errorData = error.response?.data;

      if (statusCode === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (errorData?.errors) {
        const errorMessage =
          errorData.errors[0]?.message || JSON.stringify(errorData.errors);
        throw new Error(`Fireflies.ai API error: ${errorMessage}`);
      } else {
        throw new Error(`Request failed: ${error.message}`);
      }
    } else {
      throw error;
    }
  }
};
