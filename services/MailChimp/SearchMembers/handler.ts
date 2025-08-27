import mailchimp from '@mailchimp/mailchimp_marketing';

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
  const { apiKey, serverPrefix } = process.env;

  // Validate environment variables
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your MailChimp API Key in the connector settings.',
    );
  }

  if (!serverPrefix) {
    throw new Error(
      'Missing Server Prefix. Please add your MailChimp Server Prefix (e.g., us19) in the connector settings.',
    );
  }

  // Extract inputs
  const { query, listId, outputVariable } = inputs;

  // Initialize the MailChimp client
  mailchimp.setConfig({
    apiKey: apiKey,
    server: serverPrefix,
  });

  // Prepare search parameters
  const searchParams: Record<string, any> = {
    query: query,
  };

  // Add list_id parameter if provided
  if (listId && listId.trim() !== '') {
    searchParams.list_id = listId.trim();
    log(`Searching for "${query}" in list: ${listId}`);
  } else {
    log(`Searching for "${query}" across all lists`);
  }

  try {
    // Make the API call to search for members
    const response = await mailchimp.searchMembers.search(searchParams);

    // Format the results for easier consumption
    const results = {
      exactMatches: response.exact_matches.members || [],
      partialMatches: response.full_search.members || [],
      totalExactMatches: response.exact_matches.total_items || 0,
      totalPartialMatches: response.full_search.total_items || 0,
    };

    // Log the results
    const totalResults =
      results.totalExactMatches + results.totalPartialMatches;
    if (totalResults === 0) {
      log(`No members found matching "${query}"`);
    } else {
      log(
        `Found ${totalResults} members matching "${query}" (${results.totalExactMatches} exact matches, ${results.totalPartialMatches} partial matches)`,
      );
    }

    // Set the output
    setOutput(outputVariable, results);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        log(`No results found for "${query}"`);
        // Return empty results instead of throwing an error
        setOutput(outputVariable, {
          exactMatches: [],
          partialMatches: [],
          totalExactMatches: 0,
          totalPartialMatches: 0,
        });
        return;
      }

      // Re-throw other errors
      throw new Error(`MailChimp API Error: ${error.message}`);
    } else {
      throw new Error(`Unknown error occurred: ${String(error)}`);
    }
  }
};
