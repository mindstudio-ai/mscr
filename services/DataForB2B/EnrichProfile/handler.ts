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
      'Missing DataForB2B API Key. Please add your API key in the service configuration.',
    );
  }

  const {
    profileIdentifier,
    enrichProfile = 'true',
    enrichWorkEmail = 'false',
    enrichPersonalEmail = 'false',
    enrichPhone = 'false',
    enrichGithub = 'false',
    outputVariable,
  } = inputs;

  if (!profileIdentifier) {
    throw new Error('Please provide a Profile Identifier.');
  }

  const flags = {
    enrich_profile: enrichProfile === 'true',
    enrich_work_email: enrichWorkEmail === 'true',
    enrich_personal_email: enrichPersonalEmail === 'true',
    enrich_phone: enrichPhone === 'true',
    enrich_github: enrichGithub === 'true',
  };

  // At least one data type must be requested; default to the full profile.
  if (!Object.values(flags).some(Boolean)) {
    flags.enrich_profile = true;
  }

  const requestBody = {
    profile_identifier: profileIdentifier,
    ...flags,
  };

  log(`Enriching DataForB2B profile: ${profileIdentifier}...`);

  const response = await fetch('https://api.dataforb2b.ai/enrich/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      api_key: apiKey,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    if (response.status === 429) {
      throw new Error(
        'DataForB2B rate limit exceeded. Please try again in a moment.',
      );
    }
    throw new Error(
      `DataForB2B request failed: ${response.status} ${response.statusText}. ${errorText}`,
    );
  }

  const data = await response.json();
  log('Profile enriched.');
  setOutput(outputVariable, data);
};
