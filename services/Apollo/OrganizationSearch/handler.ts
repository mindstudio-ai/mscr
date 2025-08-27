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
    organizationName,
    employeeRanges,
    locations,
    excludedLocations,
    minRevenue,
    maxRevenue,
    technologies,
    keywords,
    perPage,
    page,
    outputVariable,
  } = inputs;

  // Build request payload
  const payload: Record<string, any> = {
    page: parseInt(page, 10) || 1,
    per_page: parseInt(perPage, 10) || 10,
  };

  // Add organization name if provided
  if (organizationName) {
    payload.q_organization_name = organizationName;
  }

  // Process employee ranges (convert from semicolon-separated to array)
  if (employeeRanges) {
    payload.organization_num_employees_ranges = employeeRanges
      .split(';')
      .map((range) => range.trim());
  }

  // Process locations (convert from semicolon-separated to array)
  if (locations) {
    payload.organization_locations = locations
      .split(';')
      .map((location) => location.trim());
  }

  // Process excluded locations (convert from semicolon-separated to array)
  if (excludedLocations) {
    payload.organization_not_locations = excludedLocations
      .split(';')
      .map((location) => location.trim());
  }

  // Add revenue range if provided
  if (minRevenue) {
    payload.revenue_range = payload.revenue_range || {};
    payload.revenue_range.min = parseInt(minRevenue, 10);
  }

  if (maxRevenue) {
    payload.revenue_range = payload.revenue_range || {};
    payload.revenue_range.max = parseInt(maxRevenue, 10);
  }

  // Process technologies (convert from semicolon-separated to array)
  if (technologies) {
    payload.currently_using_any_of_technology_uids = technologies
      .split(';')
      .map((tech) => tech.trim());
  }

  // Process keywords (convert from semicolon-separated to array)
  if (keywords) {
    payload.q_organization_keyword_tags = keywords
      .split(';')
      .map((keyword) => keyword.trim());
  }

  log(`Searching for organizations with the provided filters...`);

  try {
    const response = await fetch(
      'https://api.apollo.io/api/v1/mixed_companies/search',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Apollo API request failed: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const data = await response.json();

    log(
      `Found ${data.pagination?.total_entries || 'unknown number of'} organizations matching your criteria.`,
    );

    setOutput(outputVariable, data);
  } catch (error) {
    log(
      `Error searching organizations: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
