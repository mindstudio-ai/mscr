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
    throw new Error('Missing Canva API token');
  }

  const { designId, resizeType, presetType, width, height, outputVariable } =
    inputs;

  if (!designId) {
    throw new Error('Design ID is required');
  }

  // Prepare request body based on resize type
  let designTypePayload;
  if (resizeType === 'preset') {
    if (!presetType) {
      throw new Error('Preset type is required when using preset resize type');
    }
    designTypePayload = {
      type: 'preset',
      preset_type: presetType,
    };
    log(`Preparing to resize design to preset type: ${presetType}`);
  } else {
    // Custom dimensions
    if (!width || !height) {
      throw new Error(
        'Width and height are required when using custom resize type',
      );
    }

    const numWidth = parseInt(width, 10);
    const numHeight = parseInt(height, 10);

    // Validate dimensions
    if (isNaN(numWidth) || numWidth < 40 || numWidth > 8000) {
      throw new Error('Width must be a number between 40 and 8000 pixels');
    }

    if (isNaN(numHeight) || numHeight < 40 || numHeight > 8000) {
      throw new Error('Height must be a number between 40 and 8000 pixels');
    }

    // Check maximum area constraint
    if (numWidth * numHeight > 25000000) {
      throw new Error('Design area cannot exceed 25,000,000 pixels squared');
    }

    designTypePayload = {
      type: 'custom',
      width: numWidth,
      height: numHeight,
    };
    log(
      `Preparing to resize design to custom dimensions: ${numWidth}x${numHeight} pixels`,
    );
  }

  // Prepare request body
  const requestBody = {
    design_id: designId,
    design_type: designTypePayload,
  };

  log('Starting design resize job...');

  try {
    // Make API request to start resize job
    const response = await fetch('https://api.canva.com/rest/v1/resizes', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Canva API error (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as any;

    log(`Design resize job created with ID: ${data.job.id}`);

    if (data.job.status === 'success') {
      log('Design resize completed successfully!');

      if (data.job.result?.design) {
        const design = data.job.result.design;
        log(`New design created: ${design.title} (ID: ${design.id})`);
      }
    } else if (data.job.status === 'in_progress') {
      log(
        'Design resize job is in progress. Check your Canva account for the completed design.',
      );
    } else if (data.job.status === 'failed') {
      log(
        `Design resize job failed: ${data.job.error?.message || 'Unknown error'}`,
      );
    }

    // Set output variable with the complete response
    setOutput(outputVariable, data);
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
};
