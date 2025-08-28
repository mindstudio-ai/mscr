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
    throw new Error('Missing API Key');
  }

  const {
    campaignId,
    firstName,
    lastName,
    profileUrl,
    emailAddress,
    companyName,
    position,
    location,
    summary,
    about,
    linkedInAccountId,
    customUserFields,
    outputVariable,
  } = inputs;

  // Prepare the lead object
  const lead = {
    firstName,
    lastName,
    profileUrl,
    ...(location && { location }),
    ...(summary && { summary }),
    ...(companyName && { companyName }),
    ...(position && { position }),
    ...(about && { about }),
    ...(emailAddress && { emailAddress }),
    ...(customUserFields && {
      customUserFields: parseCustomFields(customUserFields),
    }),
  };

  // Prepare the account lead pair
  const accountLeadPair = {
    lead,
    ...(linkedInAccountId && {
      linkedInAccountId: parseInt(linkedInAccountId, 10),
    }),
  };

  // Prepare the request body
  const requestBody = {
    campaignId: parseInt(campaignId, 10),
    accountLeadPairs: [accountLeadPair],
  };

  log(`Adding lead ${firstName} ${lastName} to campaign ${campaignId}...`);

  try {
    const response = await fetch(
      'https://api.heyreach.io/api/public/campaign/AddLeadsToCampaignV2',
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

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Error: ${response.status} ${response.statusText}`;

      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.errorMessage) {
          errorMessage = `Error: ${errorJson.errorMessage}`;
        } else if (errorJson.detail) {
          errorMessage = `Error: ${errorJson.detail}`;
        }
      } catch (e) {
        // If parsing fails, use the raw error text
        if (errorText) {
          errorMessage = `Error: ${errorText}`;
        }
      }

      throw new Error(errorMessage);
    }

    const result = await response.json();

    log(
      `Successfully processed lead: ${result.addedLeadsCount} added, ${result.updatedLeadsCount} updated, ${result.failedLeadsCount} failed`,
    );

    setOutput(outputVariable, result);
  } catch (error) {
    log(`Failed to add lead to campaign: ${error.message}`);
    throw error;
  }
};

/**
 * Parse custom fields from string to array of objects if needed
 */
function parseCustomFields(
  customUserFields: any,
): Array<{ name: string; value: string }> {
  // If already an array, return it
  if (Array.isArray(customUserFields)) {
    return customUserFields;
  }

  // If it's a string that was already parsed to JSON, return it
  if (typeof customUserFields === 'string') {
    try {
      return JSON.parse(customUserFields);
    } catch (e) {
      throw new Error('Invalid JSON format for customUserFields');
    }
  }

  return customUserFields;
}
