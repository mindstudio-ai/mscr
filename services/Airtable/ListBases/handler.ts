export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Airtable authentication token');
  }

  const { offset, outputVariable } = inputs;

  // Construct the URL with optional pagination offset
  let url = 'https://api.airtable.com/v0/meta/bases';
  if (offset) {
    url += `?offset=${encodeURIComponent(offset)}`;
  }

  log('Fetching list of Airtable bases...');

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Airtable API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();

    // Log the number of bases retrieved
    const basesCount = data.bases?.length || 0;
    log(
      `Successfully retrieved ${basesCount} bases${data.offset ? ' (more available)' : ''}`,
    );

    // Set the output with the full response (includes bases array and optional offset)
    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error fetching Airtable bases: ${error.message}`);
    throw error;
  }
};
