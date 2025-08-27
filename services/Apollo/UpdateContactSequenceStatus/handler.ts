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
    throw new Error('Missing Apollo API Key');
  }

  const { sequenceIds, contactIds, mode, outputVariable } = inputs;

  // Parse sequence IDs and contact IDs from multiline text to arrays
  const emailerCampaignIds = sequenceIds
    .split('\n')
    .map((id: string) => id.trim())
    .filter((id: string) => id.length > 0);

  const contactIdsArray = contactIds
    .split('\n')
    .map((id: string) => id.trim())
    .filter((id: string) => id.length > 0);

  if (emailerCampaignIds.length === 0) {
    throw new Error('At least one sequence ID is required');
  }

  if (contactIdsArray.length === 0) {
    throw new Error('At least one contact ID is required');
  }

  // Validate mode
  const validModes = ['mark_as_finished', 'remove', 'stop'];
  if (!validModes.includes(mode)) {
    throw new Error(
      `Invalid mode: ${mode}. Must be one of: ${validModes.join(', ')}`,
    );
  }

  log(
    `Updating ${contactIdsArray.length} contact(s) in ${emailerCampaignIds.length} sequence(s) with mode: ${mode}`,
  );

  try {
    // Prepare request parameters
    const params = new URLSearchParams();

    // Add sequence IDs
    emailerCampaignIds.forEach((id) => {
      params.append('emailer_campaign_ids[]', id);
    });

    // Add contact IDs
    contactIdsArray.forEach((id) => {
      params.append('contact_ids[]', id);
    });

    // Add mode
    params.append('mode', mode);

    // Make request to Apollo API
    const response = await fetch(
      `https://api.apollo.io/api/v1/emailer_campaigns/remove_or_stop_contact_ids?${params.toString()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Apollo API error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    log('Successfully updated contact status in sequence(s)');

    // Set output variable with the operation result
    setOutput(outputVariable, result);
  } catch (error) {
    log(
      `Error updating contact status: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
