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
    throw new Error('Missing Apollo API Key');
  }

  // Extract inputs
  const {
    firstName,
    lastName,
    email,
    title,
    organizationName,
    websiteUrl,
    presentRawAddress,
    directPhone,
    mobilePhone,
    corporatePhone,
    accountId,
    labelNames,
    outputVariable,
  } = inputs;

  // Validate required fields
  if (!firstName) {
    throw new Error('First name is required');
  }
  if (!lastName) {
    throw new Error('Last name is required');
  }

  // Prepare request body
  const requestBody: Record<string, any> = {
    api_key: apiKey,
    first_name: firstName,
    last_name: lastName,
  };

  // Add optional fields if provided
  if (email) {
    requestBody.email = email;
  }
  if (title) {
    requestBody.title = title;
  }
  if (organizationName) {
    requestBody.organization_name = organizationName;
  }
  if (websiteUrl) {
    requestBody.website_url = websiteUrl;
  }
  if (presentRawAddress) {
    requestBody.present_raw_address = presentRawAddress;
  }
  if (directPhone) {
    requestBody.direct_phone = directPhone;
  }
  if (mobilePhone) {
    requestBody.mobile_phone = mobilePhone;
  }
  if (corporatePhone) {
    requestBody.corporate_phone = corporatePhone;
  }
  if (accountId) {
    requestBody.account_id = accountId;
  }

  // Process labels if provided
  if (labelNames) {
    // Convert comma-separated string to array
    const labels = labelNames
      .split(',')
      .map((label) => label.trim())
      .filter(Boolean);
    if (labels.length > 0) {
      requestBody.label_names = labels;
    }
  }

  log(`Creating contact for ${firstName} ${lastName}...`);

  try {
    // Make API request
    const response = await fetch('https://api.apollo.io/api/v1/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(requestBody),
    });

    // Handle response
    const data = await response.json();

    if (!response.ok) {
      // Handle specific error codes
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (response.status === 422) {
        throw new Error(
          `Validation error: ${data.message || JSON.stringify(data)}`,
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Apollo API error: ${data.message || JSON.stringify(data)}`,
        );
      }
    }

    log(`Successfully created contact: ${firstName} ${lastName}`);

    // Set output
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error creating contact: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while creating contact');
  }
};
