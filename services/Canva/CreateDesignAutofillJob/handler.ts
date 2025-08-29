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

  const {
    brandTemplateId,
    title,
    textFields = {},
    imageFields = {},
    chartFields = {},
    jobIdOutput,
    designIdOutput,
    designUrlOutput,
  } = inputs;

  if (!brandTemplateId) {
    throw new Error('Brand Template ID is required');
  }

  if (!jobIdOutput) {
    throw new Error('Job ID Output Variable is required');
  }

  log(`Creating autofill job for brand template: ${brandTemplateId}`);

  // Prepare the data object by combining text, image, and chart fields
  const data: Record<string, any> = {};

  // Add text fields
  Object.entries(textFields).forEach(([fieldName, text]) => {
    data[fieldName] = {
      type: 'text',
      text,
    };
  });

  // Add image fields
  Object.entries(imageFields).forEach(([fieldName, assetId]) => {
    data[fieldName] = {
      type: 'image',
      asset_id: assetId,
    };
  });

  // Add chart fields
  Object.entries(chartFields).forEach(([fieldName, chartData]) => {
    data[fieldName] = {
      type: 'chart',
      chart_data: chartData,
    };
  });

  // Prepare request body
  const requestBody: Record<string, any> = {
    brand_template_id: brandTemplateId,
    data,
  };

  // Add title if provided
  if (title) {
    requestBody.title = title;
  }

  try {
    // Make the API request
    const response = await fetch('https://api.canva.com/rest/v1/autofills', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as any;
      throw new Error(
        `Canva API error (${response.status}): ${errorData.message || 'Unknown error'}`,
      );
    }

    const result = (await response.json()) as any;

    // Set the job ID output
    const jobId = result.job?.id;
    if (!jobId) {
      throw new Error('No job ID returned from Canva API');
    }

    setOutput(jobIdOutput, jobId);
    log(`Autofill job created successfully. Job ID: ${jobId}`);

    // If the job completed immediately, set design outputs if requested
    if (
      result.job.status === 'success' &&
      result.job.result?.type === 'create_design'
    ) {
      const design = result.job.result.design;

      if (designIdOutput && design?.id) {
        setOutput(designIdOutput, design.id);
        log(`Design created with ID: ${design.id}`);
      }

      if (designUrlOutput && design?.url) {
        setOutput(designUrlOutput, design.url);
        log(`Design URL: ${design.url}`);
      }
    } else {
      log(
        "Job is in progress. You'll need to check its status later to get the design details.",
      );
    }
  } catch (error) {
    log(
      `Error creating autofill job: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
