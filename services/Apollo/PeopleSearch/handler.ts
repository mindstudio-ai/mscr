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
    throw new Error(
      'Missing Apollo API Key. Please add your API key in the service configuration.',
    );
  }

  // Extract and process input parameters
  const {
    personTitles,
    includeSimilarTitles,
    keywords,
    personLocations,
    personSeniorities,
    organizationLocations,
    organizationDomains,
    contactEmailStatus,
    employeeRangeMin,
    employeeRangeMax,
    revenueMin,
    revenueMax,
    usingAllTechnologies,
    usingAnyTechnologies,
    notUsingTechnologies,
    page = '1',
    perPage = '25',
    outputVariable,
  } = inputs;

  // Helper function to convert comma-separated string to array
  const toArray = (str: string | undefined): string[] => {
    if (!str) {
      return [];
    }
    return str
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  };

  // Prepare request body
  const requestBody: Record<string, any> = {
    api_key: apiKey,
    page: parseInt(page, 10),
    per_page: parseInt(perPage, 10),
  };

  // Add search criteria if provided
  if (personTitles) {
    requestBody.person_titles = toArray(personTitles);
  }

  if (includeSimilarTitles !== undefined) {
    requestBody.include_similar_titles = includeSimilarTitles === 'true';
  }

  if (keywords) {
    requestBody.q_keywords = keywords;
  }

  if (personLocations) {
    requestBody.person_locations = toArray(personLocations);
  }

  if (personSeniorities) {
    requestBody.person_seniorities = toArray(personSeniorities);
  }

  // Add company filters if provided
  if (organizationLocations) {
    requestBody.organization_locations = toArray(organizationLocations);
  }

  if (organizationDomains) {
    requestBody.q_organization_domains_list = toArray(organizationDomains);
  }

  if (contactEmailStatus) {
    requestBody.contact_email_status = toArray(contactEmailStatus);
  }

  // Add employee range if both min and max are provided
  if (employeeRangeMin && employeeRangeMax) {
    requestBody.organization_num_employees_ranges = [
      `${employeeRangeMin},${employeeRangeMax}`,
    ];
  }

  // Add revenue range if provided
  if (revenueMin || revenueMax) {
    requestBody.revenue_range = {};
    if (revenueMin) {
      requestBody.revenue_range.min = parseInt(revenueMin, 10);
    }
    if (revenueMax) {
      requestBody.revenue_range.max = parseInt(revenueMax, 10);
    }
  }

  // Add technology filters if provided
  if (usingAllTechnologies) {
    requestBody.currently_using_all_of_technology_uids =
      toArray(usingAllTechnologies);
  }

  if (usingAnyTechnologies) {
    requestBody.currently_using_any_of_technology_uids =
      toArray(usingAnyTechnologies);
  }

  if (notUsingTechnologies) {
    requestBody.currently_not_using_any_of_technology_uids =
      toArray(notUsingTechnologies);
  }

  log(`Searching for people in Apollo with the provided filters...`);

  try {
    // Make the API request
    const response = await fetch(
      'https://api.apollo.io/api/v1/mixed_people/search',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Apollo API request failed: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    const data = await response.json();

    const totalResults = data.pagination?.total_entries || 0;
    log(`Found ${totalResults} people matching your search criteria.`);

    if (totalResults > 0) {
      log(
        `Showing page ${data.pagination?.page} of ${data.pagination?.total_pages}.`,
      );
    }

    // Set the output variable with the search results
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      // Check for rate limiting errors
      if (error.message.includes('429')) {
        throw new Error(
          'Apollo API rate limit exceeded. Please try again later.',
        );
      }
      throw error;
    }
    throw new Error('An unexpected error occurred while searching Apollo.');
  }
};
