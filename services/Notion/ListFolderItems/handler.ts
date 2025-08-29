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
  // Extract inputs
  const { folderId, filterType, sortBy, outputVariable } = inputs;

  // Get bearer token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your connection settings.',
    );
  }

  // Build the API URL with query parameters
  let apiUrl = `https://api.canva.com/rest/v1/folders/${folderId}/items`;

  // Add query parameters if provided
  const queryParams = new URLSearchParams();

  if (filterType) {
    queryParams.append('type', filterType);
  }

  if (sortBy) {
    queryParams.append('sort', sortBy);
  }

  const queryString = queryParams.toString();
  if (queryString) {
    apiUrl += `?${queryString}`;
  }

  log(`Fetching items from Canva folder: ${folderId}`);

  try {
    // Fetch data from Canva API
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Canva API error (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as any;

    // Handle pagination if a continuation token is present
    let allItems = [...data.items];
    let continuationToken = data.continuation;

    // If there's a continuation token, fetch additional pages
    if (continuationToken) {
      log('Found additional items. Fetching all pages...');

      let hasMorePages = true;
      while (hasMorePages) {
        const paginatedUrl = `${apiUrl}${apiUrl.includes('?') ? '&' : '?'}continuation=${continuationToken}`;

        const nextPageResponse = await fetch(paginatedUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!nextPageResponse.ok) {
          log('Warning: Could not fetch all pages. Returning partial results.');
          break;
        }

        const nextPageData = (await nextPageResponse.json()) as any;
        allItems = [...allItems, ...nextPageData.items];

        // Update continuation token for next page
        continuationToken = nextPageData.continuation;
        hasMorePages = !!continuationToken;
      }
    }

    // Prepare a summary of the results
    const folderCount = allItems.filter(
      (item) => item.type === 'folder',
    ).length;
    const designCount = allItems.filter(
      (item) => item.type === 'design',
    ).length;
    const imageCount = allItems.filter((item) => item.type === 'image').length;

    log(
      `Found ${allItems.length} items: ${folderCount} folders, ${designCount} designs, ${imageCount} images`,
    );

    // Set the output variable with the results
    setOutput(outputVariable, {
      items: allItems,
      summary: {
        totalItems: allItems.length,
        folderCount,
        designCount,
        imageCount,
      },
    });
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      if (error.message.includes('404')) {
        throw new Error(
          `Folder not found: ${folderId}. Please check the folder ID and try again.`,
        );
      } else if (
        error.message.includes('401') ||
        error.message.includes('403')
      ) {
        throw new Error(
          'Authentication failed. Please check your Canva connection and permissions.',
        );
      } else {
        throw new Error(`Error fetching folder items: ${error.message}`);
      }
    } else {
      throw new Error('An unknown error occurred while fetching folder items.');
    }
  }
};
