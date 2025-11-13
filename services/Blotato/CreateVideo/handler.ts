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
      'Missing API Key. Please configure your Blotato API key in the service settings.',
    );
  }

  const {
    templateId,
    script,
    style,
    captionPosition,
    animateFirstImage,
    animateAll,
    quotePrompts,
    textToImageModel,
    imageToVideoModel,
    outputVariable,
  } = inputs;

  // Build the request body based on the template type
  const requestBody: any = {
    script,
    style,
    template: {
      id: templateId,
      captionPosition: captionPosition === 'null' ? null : captionPosition,
    },
  };

  // Add animation options if provided
  if (animateFirstImage !== undefined) {
    requestBody.animateFirstImage = animateFirstImage;
  }

  if (animateAll !== undefined) {
    requestBody.animateAll = animateAll;
  }

  // Add model options if provided
  if (textToImageModel) {
    requestBody.textToImageModel = textToImageModel;
  }

  if (imageToVideoModel) {
    requestBody.imageToVideoModel = imageToVideoModel;
  }

  // Handle quote card template specific configuration
  if (templateId === 'base/slides/quotecard' && quotePrompts) {
    // Parse the quote prompts into an array of scenes
    const scenes = quotePrompts
      .split('\n')
      .filter((line: string) => line.trim() !== '')
      .map((prompt: string) => ({ prompt: prompt.trim() }));

    if (scenes.length === 0) {
      throw new Error(
        'At least one quote prompt is required for Quote Card Slideshow template',
      );
    }

    requestBody.template.scenes = scenes;
  }

  log(`Creating a ${style} video with the ${templateId} template...`);

  try {
    const response = await fetch(
      'https://backend.blotato.com/v2/videos/creations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      if (response.status === 429) {
        const errorData = await response.json();
        throw new Error(
          `Rate limit exceeded. ${errorData.message || 'Please try again later.'}`,
        );
      }

      const errorText = await response.text();
      throw new Error(
        `Failed to create video: ${response.status} ${response.statusText}. ${errorText}`,
      );
    }

    const data = (await response.json()) as any;
    const videoId = data.item?.id;

    if (!videoId) {
      throw new Error('Failed to get video ID from response');
    }

    log(`Video creation started successfully! Video ID: ${videoId}`);
    log(
      'The video will be processed in the background. You can check its status at https://my.blotato.com/videos/' +
        videoId,
    );

    setOutput(outputVariable, videoId);
  } catch (error) {
    log(`Error creating video: ${(error as Error).message}`);
    throw error;
  }
};
