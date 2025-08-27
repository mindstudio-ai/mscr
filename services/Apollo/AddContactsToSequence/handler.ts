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
    sequenceId,
    contactIds,
    emailAccountId,
    sequenceNoEmail = 'false',
    sequenceUnverifiedEmail = 'false',
    sequenceJobChange = 'false',
    sequenceActiveInOtherCampaigns = 'false',
    sequenceFinishedInOtherCampaigns = 'false',
    userId,
    outputVariable,
  } = inputs;

  if (!sequenceId) {
    throw new Error('Sequence ID is required');
  }

  if (!contactIds) {
    throw new Error('Contact IDs are required');
  }

  if (!emailAccountId) {
    throw new Error('Email Account ID is required');
  }

  // Parse comma-separated contact IDs into an array
  const contactIdsArray = contactIds.split(',').map((id) => id.trim());

  log(`Adding ${contactIdsArray.length} contact(s) to sequence ${sequenceId}`);

  // Construct query parameters
  const queryParams = new URLSearchParams({
    emailer_campaign_id: sequenceId,
    send_email_from_email_account_id: emailAccountId,
    sequence_no_email: sequenceNoEmail,
    sequence_unverified_email: sequenceUnverifiedEmail,
    sequence_job_change: sequenceJobChange,
    sequence_active_in_other_campaigns: sequenceActiveInOtherCampaigns,
    sequence_finished_in_other_campaigns: sequenceFinishedInOtherCampaigns,
  });

  // Add contact IDs to query parameters
  contactIdsArray.forEach((id) => {
    queryParams.append('contact_ids[]', id);
  });

  // Add optional user ID if provided
  if (userId) {
    queryParams.append('user_id', userId);
  }

  const url = `https://api.apollo.io/api/v1/emailer_campaigns/${sequenceId}/add_contact_ids?${queryParams}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Apollo API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    log('Successfully added contacts to sequence');
    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error adding contacts to sequence: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
