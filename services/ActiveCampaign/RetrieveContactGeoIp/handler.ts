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
  // Extract environment variables
  const { accessToken, accountIdentifier } = process.env;

  // Validate environment variables
  if (!accessToken) {
    throw new Error(
      'Missing API Key. Please add your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please add your ActiveCampaign Account URL in the connector settings.',
    );
  }

  // Extract inputs
  const { geoAddressID, outputVariable } = inputs;

  // Validate inputs
  if (!geoAddressID) {
    throw new Error(
      'Missing Geo Address ID. Please provide a valid Geo Address ID.',
    );
  }

  // Construct API URL
  // Remove trailing slash from accountIdentifier if present
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const url = `${baseUrl}/api/3/geoIps/${geoAddressID}/geoAddress`;

  log(`Retrieving geo IP address information for ID: ${geoAddressID}`);

  try {
    // Make API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Api-Token': accessToken,
      },
    });

    // Handle response status
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Geo address with ID ${geoAddressID} not found.`);
      } else {
        const errorText = await response.text();
        throw new Error(
          `API request failed with status ${response.status}: ${errorText}`,
        );
      }
    }

    // Parse response
    const data = await response.json();

    log('Successfully retrieved geo IP address information');

    // Set output
    setOutput(outputVariable, data.geoAddress);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error(
      'An unknown error occurred while retrieving geo IP address information',
    );
  }
};
