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
      'Missing API Key. Please configure your Blotato API Key in the service settings.',
    );
  }

  // Extract inputs
  const {
    postText,
    platform,
    accountId,
    mediaUrls,
    scheduleType,
    scheduledTime,
    outputVariable,
    // Platform-specific inputs
    facebookPageId,
    linkedinPageId,
    pinterestBoardId,
    pinterestTitle,
    tiktokPrivacyLevel,
    youtubeTitle,
    youtubePrivacyStatus,
  } = inputs;

  // Validate required fields
  if (!postText) {
    throw new Error('Post text is required');
  }
  if (!platform) {
    throw new Error('Platform is required');
  }
  if (!accountId) {
    throw new Error('Account ID is required');
  }

  // Process media URLs if provided
  const mediaUrlsArray = mediaUrls
    ? mediaUrls
        .split(',')
        .map((url: string) => url.trim())
        .filter((url: string) => url)
    : [];

  // Prepare the target object based on the selected platform
  const target: Record<string, any> = {
    targetType: platform,
  };

  // Add platform-specific properties to target
  switch (platform) {
    case 'facebook':
      if (!facebookPageId) {
        throw new Error('Facebook Page ID is required for Facebook posts');
      }
      target.pageId = facebookPageId;
      break;
    case 'linkedin':
      if (linkedinPageId) {
        target.pageId = linkedinPageId;
      }
      break;
    case 'pinterest':
      if (!pinterestBoardId) {
        throw new Error('Pinterest Board ID is required for Pinterest posts');
      }
      target.boardId = pinterestBoardId;
      if (pinterestTitle) {
        target.title = pinterestTitle;
      }
      break;
    case 'tiktok':
      target.privacyLevel = tiktokPrivacyLevel || 'PUBLIC_TO_EVERYONE';
      target.disabledComments = false;
      target.disabledDuet = false;
      target.disabledStitch = false;
      target.isBrandedContent = false;
      target.isYourBrand = false;
      target.isAiGenerated = true;
      break;
    case 'youtube':
      if (!youtubeTitle) {
        throw new Error('Video Title is required for YouTube posts');
      }
      target.title = youtubeTitle;
      target.privacyStatus = youtubePrivacyStatus || 'public';
      target.shouldNotifySubscribers = true;
      target.isMadeForKids = false;
      break;
  }

  // Prepare the request payload
  const requestBody: Record<string, any> = {
    post: {
      accountId,
      content: {
        text: postText,
        mediaUrls: mediaUrlsArray,
        platform,
      },
      target,
    },
  };

  // Add scheduling information based on scheduleType
  if (scheduleType === 'scheduled') {
    if (!scheduledTime) {
      throw new Error('Scheduled time is required when scheduling a post');
    }
    requestBody.scheduledTime = scheduledTime;
  } else if (scheduleType === 'nextSlot') {
    requestBody.useNextFreeSlot = true;
  }

  log(
    `Preparing to publish ${platform} post${scheduleType !== 'immediate' ? ' (scheduled)' : ''}`,
  );

  try {
    // Make the API request
    const response = await fetch('https://backend.blotato.com/v2/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Check for errors
    if (!response.ok) {
      let errorText = '';
      try {
        const errorData = (await response.json()) as any;
        errorText =
          errorData.message ||
          `Error: ${response.status} ${response.statusText}`;
      } catch (e) {
        errorText = `Error: ${response.status} ${response.statusText}`;
      }

      throw new Error(`Failed to publish post: ${errorText}`);
    }

    // Process the successful response
    const result = (await response.json()) as { postSubmissionId: string };
    log(`Successfully submitted post with ID: ${result.postSubmissionId}`);

    // Set the output variable
    setOutput(outputVariable, result.postSubmissionId);
  } catch (error) {
    log(
      `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
    );
    throw error;
  }
};
