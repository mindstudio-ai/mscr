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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your HeyReach API Key in the service settings.',
    );
  }

  // Extract inputs
  const {
    listId,
    firstName,
    lastName,
    emailAddress,
    profileUrl,
    companyName,
    position,
    location,
    summary,
    about,
    customFields,
    outputVariable,
  } = inputs;

  // Validate required fields
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!firstName || !lastName) {
    throw new Error('First name and last name are required');
  }

  // Prepare the lead object
  const lead: Record<string, any> = {
    firstName,
    lastName,
  };

  // Add optional fields if they exist
  if (emailAddress) {
    lead.emailAddress = emailAddress;
  }
  if (profileUrl) {
    lead.profileUrl = profileUrl;
  }
  if (companyName) {
    lead.companyName = companyName;
  }
  if (position) {
    lead.position = position;
  }
  if (location) {
    lead.location = location;
  }
  if (summary) {
    lead.summary = summary;
  }
  if (about) {
    lead.about = about;
  }

  // Process custom fields if provided
  if (customFields) {
    try {
      // customFields is already parsed if it was a valid JSON string
      const parsedCustomFields = Array.isArray(customFields)
        ? customFields
        : JSON.parse(customFields);

      // Validate custom fields format
      if (Array.isArray(parsedCustomFields) && parsedCustomFields.length > 0) {
        // Check if all custom fields have name and value properties
        const validCustomFields = parsedCustomFields.every(
          (field) =>
            field.name && typeof field.name === 'string' && 'value' in field,
        );

        if (validCustomFields) {
          lead.customUserFields = parsedCustomFields;
        } else {
          log(
            'Warning: Custom fields format is invalid. Each field must have a name and value property.',
          );
        }
      }
    } catch (error) {
      log(
        'Warning: Failed to parse custom fields. Ensure they are in valid JSON format.',
      );
    }
  }

  // Prepare the request body
  const requestBody = {
    leads: [lead],
    listId,
  };

  log(`Adding lead ${firstName} ${lastName} to list ${listId}...`);

  try {
    // Make the API request
    const response = await fetch(
      'https://api.heyreach.io/api/public/list/AddLeadsToListV2',
      {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json',
          Accept: 'text/plain',
        },
        body: JSON.stringify(requestBody),
      },
    );

    // Check for HTTP errors
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Failed to add lead to list. Status: ${response.status}`;

      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.errorMessage) {
          errorMessage += ` - ${errorJson.errorMessage}`;
        } else if (errorJson.detail) {
          errorMessage += ` - ${errorJson.detail}`;
        }
      } catch (e) {
        // If error response is not JSON, use the raw text
        if (errorText) {
          errorMessage += ` - ${errorText}`;
        }
      }

      // Handle specific error cases
      if (response.status === 401) {
        throw new Error(
          'Unauthorized: Invalid API key or insufficient permissions',
        );
      } else if (response.status === 404) {
        throw new Error(`List with ID ${listId} not found`);
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please try again later');
      }

      throw new Error(errorMessage);
    }

    // Parse the response
    const result = await response.json();

    // Log the results
    log(
      `Successfully processed request: ${result.addedLeadsCount} leads added, ${result.updatedLeadsCount} updated, ${result.failedLeadsCount} failed`,
    );

    // Set the output
    setOutput(outputVariable, result);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`An unexpected error occurred: ${String(error)}`);
    }
  }
};
