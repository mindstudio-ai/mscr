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
  const { url, consumerKey, consumerSecret } = process.env;

  // Validate required environment variables
  if (!url) {
    throw new Error(
      'Missing WooCommerce Store URL. Please check your connection settings.',
    );
  }
  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'Missing WooCommerce API credentials. Please check your connection settings.',
    );
  }

  // Extract inputs
  const {
    reviewId,
    status,
    reviewer,
    reviewerEmail,
    review,
    rating,
    verified,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!reviewId) {
    throw new Error('Review ID is required');
  }

  // Build the request URL
  const baseUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  const requestUrl = `${baseUrl}/wp-json/wc/v3/products/reviews/${reviewId}`;

  log(`Updating product review with ID: ${reviewId}`);

  // Prepare request body with only provided fields
  const requestBody: Record<string, any> = {};

  if (status !== undefined) {
    requestBody.status = status;
  }
  if (reviewer !== undefined) {
    requestBody.reviewer = reviewer;
  }
  if (reviewerEmail !== undefined) {
    requestBody.reviewer_email = reviewerEmail;
  }
  if (review !== undefined) {
    requestBody.review = review;
  }

  // Convert rating to integer if provided
  if (rating !== undefined) {
    requestBody.rating = parseInt(rating, 10);
  }

  // Convert verified to boolean if provided
  if (verified !== undefined) {
    requestBody.verified = verified === 'true';
  }

  try {
    // Make the API request
    const response = await fetch(requestUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64'),
      },
      body: JSON.stringify(requestBody),
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 404) {
        throw new Error(`Review with ID ${reviewId} not found`);
      } else {
        throw new Error(
          `WooCommerce API error (${response.status}): ${errorText}`,
        );
      }
    }

    const data = await response.json();
    log('Product review updated successfully');

    // Set the output variable
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error updating product review: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while updating the product review');
  }
};
