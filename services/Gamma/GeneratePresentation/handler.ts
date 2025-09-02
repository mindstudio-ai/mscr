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
  // Extract API key from environment variables
  const { token: apiKey } = process.env;
  if (!apiKey) {
    throw new Error(`Missing Gamma API key. Please configure your connection.`);
  }

  // Extract inputs with defaults where appropriate
  const {
    inputText,
    format = 'presentation',
    themeName = 'Oasis',
    textMode = 'generate',
    numCards = '10',
    cardSplit = 'auto',
    additionalInstructions = '',
    textAmount = 'medium',
    tone = '',
    audience = '',
    language = 'en',
    imageSource = 'aiGenerated',
    imageModel = 'flux-1-pro',
    imageStyle = 'photorealistic',
    exportAs = 'pdf',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!inputText) {
    throw new Error('Input text is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable is required');
  }

  // Prepare the request payload
  const payload: any = {
    inputText,
    format,
    themeName,
    textMode,
    numCards: parseInt(numCards, 10) || 10,
    cardSplit,
    exportAs,
  };

  // Add optional parameters if provided
  if (additionalInstructions) {
    payload.additionalInstructions = additionalInstructions;
  }

  // Add text options
  payload.textOptions = {
    amount: textAmount,
    language,
  };

  if (tone) {
    payload.textOptions.tone = tone;
  }
  if (audience) {
    payload.textOptions.audience = audience;
  }

  // Add image options
  payload.imageOptions = {
    source: imageSource,
  };

  // Only add model and style if using AI generated images
  if (imageSource === 'aiGenerated') {
    if (imageModel) {
      payload.imageOptions.model = imageModel;
    }
    if (imageStyle) {
      payload.imageOptions.style = imageStyle;
    }
  }

  // Log the start of the generation process
  log(
    `Starting presentation generation with ${numCards} cards in ${format} format`,
  );
  log(`Using theme: ${themeName}`);

  try {
    // Create the generation
    log('Sending request to Gamma API...');
    const response = await fetch(
      'https://public-api.gamma.app/v0.2/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': apiKey,
        },
        body: JSON.stringify(payload),
      },
    );

    // Parse the response
    const responseData = (await response.json()) as any;

    if (!response.ok) {
      throw new Error(
        `Gamma API error: ${responseData.message || JSON.stringify(responseData)}`,
      );
    }

    if (!responseData.generationId) {
      throw new Error(
        `${JSON.stringify(responseData)} Failed to get generation ID from Gamma`,
      );
    }

    const generationId = responseData.generationId;
    log(`Generation started with ID: ${generationId}`);

    // Poll for completion
    let isComplete = false;
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes with 5-second intervals

    while (!isComplete && attempts < maxAttempts) {
      attempts++;

      // Wait 5 seconds between checks
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Check generation status
      log(`Checking generation status (attempt ${attempts})...`);
      const statusResponse = await fetch(
        `https://public-api.gamma.app/v0.2/generations/${generationId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey,
          },
        },
      );

      const statusData = (await statusResponse.json()) as any;

      if (!statusResponse.ok) {
        throw new Error(
          `Error checking generation status: ${statusData.message || JSON.stringify(statusData)}`,
        );
      }

      if (statusData.status === 'completed') {
        isComplete = true;
        log('Generation completed successfully!');

        // Get the export URL
        if (!statusData.exportUrl) {
          throw new Error('No export URL found in completed generation');
        }

        // Download the file and upload to our CDN
        log(`Downloading ${exportAs.toUpperCase()} file...`);
        log(`Export URL: ${statusData.exportUrl}`);

        const fileResponse = await fetch(statusData.exportUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; MindStudioConnector/1.0)',
            Referer: 'https://gamma.app/',
            Accept:
              'application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation,*/*',
            'X-API-KEY': apiKey,
          },
        });

        if (!fileResponse.ok) {
          const errorText = await fileResponse.text();
          log(`Error response body: ${errorText}`);
          throw new Error(
            `Failed to download file: ${fileResponse.status} ${fileResponse.statusText} - ${errorText}`,
          );
        }

        const fileBuffer = Buffer.from(await fileResponse.arrayBuffer());

        // Determine the correct MIME type
        const mimeType =
          exportAs === 'pdf'
            ? 'application/pdf'
            : 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

        // Upload to our CDN
        log('Uploading file to storage...');

        const cdnUrl = await uploadFile(fileBuffer, mimeType);

        log(cdnUrl);

        // Set the output variable
        log(`Setting output variable: ${outputVariable}`);
        setOutput(outputVariable, cdnUrl);

        // Also provide the direct Gamma URL for reference
        // log(`Gamma presentation URL: ${statusData.url}`);

        return;
      } else if (statusData.status === 'failed') {
        throw new Error(
          `Generation failed: ${statusData.error || 'Unknown error'}`,
        );
      } else {
        // Still processing
        log(`Generation in progress (status: ${statusData.status})...`);
      }
    }

    if (!isComplete) {
      throw new Error('Generation timed out after 5 minutes');
    }
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error: ${errorMessage}`);
    throw error;
  }
};
