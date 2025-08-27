export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your beehiiv API key in the connector settings.',
    );
  }

  const {
    publicationId,
    title,
    subtitle,
    bodyContent,
    status,
    scheduledAt,
    thumbnailImageUrl,
    contentTags,
    outputVariable,
  } = inputs;

  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!title) {
    throw new Error('Post title is required');
  }

  // Prepare the request body
  const requestBody: Record<string, any> = {
    title,
  };

  // Add optional fields if they exist
  if (subtitle) {
    requestBody.subtitle = subtitle;
  }
  if (bodyContent) {
    requestBody.body_content = bodyContent;
  }
  if (status) {
    requestBody.status = status;
  }
  if (scheduledAt) {
    requestBody.scheduled_at = scheduledAt;
  }
  if (thumbnailImageUrl) {
    requestBody.thumbnail_image_url = thumbnailImageUrl;
  }

  // Handle content tags if provided
  if (contentTags) {
    // Convert comma-separated string to array
    const tagsArray = contentTags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    if (tagsArray.length > 0) {
      requestBody.content_tags = tagsArray;
    }
  }

  log(`Creating post "${title}" for publication ${publicationId}...`);

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/posts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      log(`Error creating post: ${response.status} ${response.statusText}`);
      throw new Error(
        `Failed to create post: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    const responseData = await response.json();

    if (!responseData.data || !responseData.data.id) {
      throw new Error('Invalid response from beehiiv API: missing post ID');
    }

    const postId = responseData.data.id;
    log(`Post created successfully with ID: ${postId}`);

    // Set the output variable
    setOutput(outputVariable, postId);
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
