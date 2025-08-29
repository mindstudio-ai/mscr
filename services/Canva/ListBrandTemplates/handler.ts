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
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing Canva API token. Please check your connection settings.',
    );
  }

  const {
    searchTerm = '',
    ownership = 'any',
    sortBy = 'relevance',
    datasetFilter = 'any',
    maxResults = '50',
    outputVariable,
  } = inputs;

  // Validate maxResults is a positive number
  const maxResultsNum = parseInt(maxResults, 10);
  if (isNaN(maxResultsNum) || maxResultsNum <= 0) {
    throw new Error('Maximum Results must be a positive number');
  }

  log('Fetching brand templates from Canva...');

  // Build base URL with query parameters
  let url = 'https://api.canva.com/rest/v1/brand-templates';
  const queryParams = new URLSearchParams();

  if (searchTerm) {
    queryParams.append('search', searchTerm);
  }

  if (ownership) {
    queryParams.append('ownership', ownership);
  }

  if (sortBy) {
    queryParams.append('sort', sortBy);
  }

  if (datasetFilter) {
    queryParams.append('dataset', datasetFilter);
  }

  // Add query parameters to URL if any exist
  if (queryParams.toString()) {
    url = `${url}?${queryParams.toString()}`;
  }

  // Collect all templates
  const allTemplates = [];
  let continuationToken = null;

  try {
    // Continue fetching until we have enough results or there are no more results
    do {
      // If we have a continuation token, add it to the URL
      let currentUrl = url;
      if (continuationToken) {
        // Add continuation token to existing URL, considering existing query parameters
        const separator = currentUrl.includes('?') ? '&' : '?';
        currentUrl = `${currentUrl}${separator}continuation=${continuationToken}`;
      }

      log(`Requesting templates${continuationToken ? ' (continued)' : ''}...`);

      const response = await fetch(currentUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // Handle common error responses
        if (response.status === 401) {
          throw new Error(
            'Authentication failed. Please check your Canva API token.',
          );
        } else if (response.status === 403) {
          throw new Error(
            'You do not have permission to access brand templates. This API requires Canva Enterprise access.',
          );
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else {
          const errorText = await response.text();
          throw new Error(`Canva API error (${response.status}): ${errorText}`);
        }
      }

      const data = (await response.json()) as any;

      // Add templates to our collection
      if (data.items && Array.isArray(data.items)) {
        allTemplates.push(...data.items);
        log(
          `Retrieved ${data.items.length} templates (total: ${allTemplates.length})`,
        );
      }

      // Get continuation token for next page if available
      continuationToken = data.continuation || null;

      // Stop if we've reached the maximum number of results
      if (allTemplates.length >= maxResultsNum) {
        allTemplates.length = maxResultsNum; // Trim to exact max
        break;
      }
    } while (continuationToken);

    log(`Successfully retrieved ${allTemplates.length} brand templates`);

    // Set the output variable with the templates
    setOutput(outputVariable, allTemplates);
  } catch (error) {
    // Catch and rethrow any errors that weren't handled above
    if (error instanceof Error) {
      throw new Error(`Error fetching brand templates: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while fetching brand templates');
    }
  }
};
