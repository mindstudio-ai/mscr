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
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing Apollo API Key. Please check your connection settings.',
    );
  }

  // Extract inputs
  const {
    name,
    firstName,
    lastName,
    email,
    organizationName,
    domain,
    linkedinUrl,
    revealPersonalEmails,
    revealPhoneNumber,
    webhookUrl,
    outputVariable,
  } = inputs;

  // Validate that at least one identifier is provided
  if (
    !name &&
    !firstName &&
    !lastName &&
    !email &&
    !organizationName &&
    !domain &&
    !linkedinUrl
  ) {
    throw new Error(
      'At least one person identifier (name, email, company details, or LinkedIn URL) is required.',
    );
  }

  // Validate webhook URL is provided if phone numbers are requested
  if (revealPhoneNumber === 'true' && !webhookUrl) {
    throw new Error('A webhook URL is required when requesting phone numbers.');
  }

  // Build request parameters
  const params: Record<string, string | boolean> = {};

  if (name) {
    params.name = name;
  }
  if (firstName) {
    params.first_name = firstName;
  }
  if (lastName) {
    params.last_name = lastName;
  }
  if (email) {
    params.email = email;
  }
  if (organizationName) {
    params.organization_name = organizationName;
  }
  if (domain) {
    params.domain = domain;
  }
  if (linkedinUrl) {
    params.linkedin_url = linkedinUrl;
  }

  // Convert string boolean values to actual booleans
  params.reveal_personal_emails = revealPersonalEmails === 'true';
  params.reveal_phone_number = revealPhoneNumber === 'true';

  if (webhookUrl) {
    params.webhook_url = webhookUrl;
  }

  log('Sending request to Apollo to enrich person data...');

  try {
    // Make request to Apollo API
    const response = await fetch('https://api.apollo.io/api/v1/people/match', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(params),
    });

    // Handle response
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Apollo API key.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        const errorText = await response.text();
        throw new Error(`Apollo API error (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json();

    // Check if a person was found
    if (!data.person) {
      log('No matching person found in Apollo database.');
      setOutput(outputVariable, {
        found: false,
        message: 'No matching person found',
      });
      return;
    }

    log(`Successfully enriched data for ${data.person.name || 'person'}`);

    // Set output
    setOutput(outputVariable, data);

    if (revealPhoneNumber === 'true') {
      log(
        'Phone number request submitted. Apollo will send phone data to your webhook URL.',
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Apollo enrichment failed: ${error.message}`);
    } else {
      throw new Error('Apollo enrichment failed with an unknown error');
    }
  }
};
