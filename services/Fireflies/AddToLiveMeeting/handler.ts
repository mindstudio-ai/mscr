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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Fireflies.ai API key in the connector settings.',
    );
  }

  // Extract inputs
  const {
    meetingLink,
    title,
    meetingPassword,
    duration,
    language,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!meetingLink) {
    throw new Error('Meeting link is required');
  }

  // Prepare GraphQL mutation
  const mutation = `
    mutation AddToLiveMeeting(
      $meetingLink: String!
      $title: String
      $meetingPassword: String
      $duration: Int
      $language: String
    ) {
      addToLiveMeeting(
        meeting_link: $meetingLink
        title: $title
        meeting_password: $meetingPassword
        duration: $duration
        language: $language
      ) {
        success
      }
    }
  `;

  // Prepare variables for the GraphQL request
  const variables: Record<string, any> = {
    meetingLink,
  };

  // Add optional parameters if they exist
  if (title) {
    variables.title = title;
  }
  if (meetingPassword) {
    variables.meetingPassword = meetingPassword;
  }
  if (duration) {
    variables.duration = parseInt(duration, 10);
  }
  if (language) {
    variables.language = language;
  }

  log(`Adding Fireflies.ai bot to meeting: ${meetingLink}`);

  try {
    // Make the GraphQL request
    const response = await axios.post(
      'https://api.fireflies.ai/graphql',
      {
        query: mutation,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    // Check for errors in the response
    if (response.data.errors) {
      const errorMessage = response.data.errors[0].message;
      const errorCode = response.data.errors[0].extensions?.code;

      // Handle specific error codes
      if (errorCode === 'too_many_requests') {
        throw new Error(
          'Rate limit exceeded. You can only add the bot to 3 meetings every 20 minutes.',
        );
      } else if (errorCode === 'invalid_language_code') {
        throw new Error('The language code provided is invalid.');
      } else if (errorCode === 'account_cancelled') {
        throw new Error('Your Fireflies.ai account has been cancelled.');
      } else if (errorCode === 'unsupported_platform') {
        throw new Error(
          'The meeting platform is not supported by Fireflies.ai.',
        );
      } else {
        throw new Error(`Error: ${errorMessage}`);
      }
    }

    // Extract the success value from the response
    const success = response.data.data.addToLiveMeeting.success;

    log(`Successfully added Fireflies.ai bot to the meeting`);

    // Set the output variable
    setOutput(outputVariable, success);
  } catch (error) {
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorData = error.response.data;
        if (errorData.errors && errorData.errors.length > 0) {
          throw new Error(
            `Fireflies.ai API error: ${errorData.errors[0].message}`,
          );
        } else {
          throw new Error(
            `Fireflies.ai API error: ${error.response.status} - ${error.response.statusText}`,
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error(
          'No response received from Fireflies.ai API. Please check your internet connection.',
        );
      } else {
        // Something happened in setting up the request
        throw new Error(`Error setting up request: ${error.message}`);
      }
    } else {
      // Handle non-axios errors
      throw error;
    }
  }
};
