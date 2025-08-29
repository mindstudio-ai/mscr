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
    throw new Error('Missing authentication token');
  }

  const {
    designTypeOption,
    presetName,
    width,
    height,
    title,
    assetId,
    outputVariable,
  } = inputs;

  // Prepare the request body based on design type
  const requestBody: any = {
    title,
  };

  // Configure design_type based on user selection
  if (designTypeOption === 'preset') {
    if (!presetName) {
      throw new Error('Preset name is required when using preset design type');
    }

    requestBody.design_type = {
      type: 'preset',
      name: presetName,
    };

    log(`Creating a new ${presetName} design in Canva`);
  } else if (designTypeOption === 'custom') {
    // Validate width and height for custom designs
    if (!width || !height) {
      throw new Error('Width and height are required for custom designs');
    }

    const numWidth = Number(width);
    const numHeight = Number(height);

    if (isNaN(numWidth) || numWidth < 40 || numWidth > 8000) {
      throw new Error('Width must be a number between 40 and 8000 pixels');
    }

    if (isNaN(numHeight) || numHeight < 40 || numHeight > 8000) {
      throw new Error('Height must be a number between 40 and 8000 pixels');
    }

    requestBody.design_type = {
      type: 'custom',
      width: numWidth,
      height: numHeight,
    };

    log(`Creating a custom design with dimensions ${width}x${height} pixels`);
  } else {
    throw new Error('Invalid design type option');
  }

  // Add asset ID if provided
  if (assetId) {
    requestBody.asset_id = assetId;
    log(`Including asset with ID: ${assetId}`);
  }

  try {
    // Make the API request to create the design
    log('Sending request to Canva API...');

    const response = await fetch('https://api.canva.com/rest/v1/designs', {
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

    // Log success and provide some useful information
    log(`Design created successfully! Design ID: ${data.design.id}`);

    if (data.design.urls?.edit_url) {
      log(`Design can be edited at: ${data.design.urls.edit_url}`);
    }

    // Set the output variable with the complete response
    setOutput(outputVariable, data);
  } catch (error) {
    log('Failed to create design');
    throw error;
  }
};
