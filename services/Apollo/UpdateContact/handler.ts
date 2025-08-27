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

  const {
    contactId,
    firstName,
    lastName,
    email,
    title,
    organizationName,
    websiteUrl,
    accountId,
    contactStageId,
    presentRawAddress,
    labelNames,
    directPhone,
    corporatePhone,
    mobilePhone,
    outputVariable,
  } = inputs;

  if (!contactId) {
    throw new Error('Contact ID is required');
  }

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Only add parameters that have been provided
  if (firstName) {
    queryParams.append('first_name', firstName);
  }
  if (lastName) {
    queryParams.append('last_name', lastName);
  }
  if (email) {
    queryParams.append('email', email);
  }
  if (title) {
    queryParams.append('title', title);
  }
  if (organizationName) {
    queryParams.append('organization_name', organizationName);
  }
  if (websiteUrl) {
    queryParams.append('website_url', websiteUrl);
  }
  if (accountId) {
    queryParams.append('account_id', accountId);
  }
  if (contactStageId) {
    queryParams.append('contact_stage_id', contactStageId);
  }
  if (presentRawAddress) {
    queryParams.append('present_raw_address', presentRawAddress);
  }
  if (directPhone) {
    queryParams.append('direct_phone', directPhone);
  }
  if (corporatePhone) {
    queryParams.append('corporate_phone', corporatePhone);
  }
  if (mobilePhone) {
    queryParams.append('mobile_phone', mobilePhone);
  }

  // Handle labels - convert comma-separated string to array entries
  if (labelNames) {
    const labels = labelNames.split(',').map((label) => label.trim());
    labels.forEach((label) => {
      queryParams.append('label_names[]', label);
    });
  }

  const url = `https://api.apollo.io/api/v1/contacts/${contactId}?${queryParams.toString()}`;

  log(`Updating contact with ID: ${contactId}`);

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Apollo API key.',
        );
      } else if (response.status === 422) {
        throw new Error(`Invalid request: ${errorText}`);
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Apollo API error (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json();
    log('Contact updated successfully');

    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error updating contact: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while updating contact');
  }
};
