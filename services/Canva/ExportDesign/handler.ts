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
  const { accessToken } = process.env;
  if (!accessToken) {
    throw new Error(
      'Missing access token. Please check your Canva connection settings.',
    );
  }

  const {
    designId,
    formatType,
    exportQuality = 'regular',
    pdfSize,
    jpgQuality,
    width,
    height,
    pngOptions,
    videoQuality,
    pages,
    outputVariable,
  } = inputs;

  if (!designId) {
    throw new Error('Design ID is required');
  }

  // Parse pages if provided
  let parsedPages: number[] | undefined;
  if (pages) {
    parsedPages = pages
      .split(',')
      .map((page) => parseInt(page.trim()))
      .filter((page) => !isNaN(page));
    if (parsedPages.length === 0) {
      parsedPages = undefined;
    }
  }

  // Build the format object based on the selected format type
  const format: Record<string, any> = {
    type: formatType,
    export_quality: exportQuality,
  };

  // Add format-specific options
  switch (formatType) {
    case 'pdf':
      if (pdfSize) {
        format.size = pdfSize;
      }
      break;
    case 'jpg':
      if (jpgQuality) {
        format.quality = parseInt(jpgQuality);
      }
      if (width) {
        format.width = parseInt(width);
      }
      if (height) {
        format.height = parseInt(height);
      }
      break;
    case 'png':
      if (width) {
        format.width = parseInt(width);
      }
      if (height) {
        format.height = parseInt(height);
      }
      if (pngOptions === 'transparent') {
        format.transparent = true;
      }
      break;
    case 'gif':
      if (width) {
        format.width = parseInt(width);
      }
      if (height) {
        format.height = parseInt(height);
      }
      break;
    case 'mp4':
      if (videoQuality) {
        format.quality = videoQuality;
      }
      break;
  }

  // Add pages if specified
  if (parsedPages) {
    format.pages = parsedPages;
  }

  // Prepare the request body
  const requestBody = {
    design_id: designId,
    format,
  };

  log(`Creating export job for design ${designId} in ${formatType} format...`);

  try {
    // Create the export job
    const response = await fetch('https://api.canva.com/rest/v1/exports', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to create export job: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const jobData = (await response.json()) as any;
    const jobId = jobData.job.id;

    log(`Export job created with ID: ${jobId}. Waiting for completion...`);

    // Poll for job completion
    let jobComplete = false;
    let jobResult: any = null;
    let attempts = 0;
    const maxAttempts = 30; // Maximum polling attempts
    const pollingInterval = 2000; // 2 seconds between polls

    while (!jobComplete && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, pollingInterval));

      const statusResponse = await fetch(
        `https://api.canva.com/rest/v1/exports/${jobId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!statusResponse.ok) {
        const errorText = await statusResponse.text();
        throw new Error(
          `Failed to check export job status: ${statusResponse.status} ${statusResponse.statusText} - ${errorText}`,
        );
      }

      jobResult = (await statusResponse.json()) as any;

      if (jobResult.job.status === 'success') {
        jobComplete = true;
        log('Export job completed successfully!');
      } else if (jobResult.job.status === 'failed') {
        throw new Error(
          `Export job failed: ${jobResult.job.error?.code} - ${jobResult.job.error?.message}`,
        );
      } else {
        log(`Export in progress... (attempt ${attempts + 1}/${maxAttempts})`);
        attempts++;
      }
    }

    if (!jobComplete) {
      throw new Error(
        'Export job timed out. Please try again later or with a smaller design.',
      );
    }

    // Set the output variable with the download URLs
    if (jobResult.job.urls && jobResult.job.urls.length > 0) {
      if (jobResult.job.urls.length === 1) {
        // If there's only one URL, return it as a string
        setOutput(outputVariable, jobResult.job.urls[0]);
        log(`Export URL saved to variable: ${outputVariable}`);
      } else {
        // If there are multiple URLs (multiple pages), return them as an array
        setOutput(outputVariable, jobResult.job.urls);
        log(
          `${jobResult.job.urls.length} export URLs saved to variable: ${outputVariable}`,
        );
      }
    } else {
      throw new Error(
        'Export job completed but no download URLs were provided.',
      );
    }
  } catch (error: any) {
    log(`Error: ${error.message}`);
    throw error;
  }
};
