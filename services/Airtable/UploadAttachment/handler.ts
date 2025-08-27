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
  const {
    baseId,
    recordId,
    attachmentField,
    fileContent,
    fileName,
    contentType,
    outputVariable,
  } = inputs;

  // Validate environment variables
  const token = process.env.token;
  if (!token) {
    throw new Error(
      'Missing Airtable authentication token. Please check your connection settings.',
    );
  }

  // Validate required inputs
  if (!baseId) {
    throw new Error('Base ID is required');
  }
  if (!recordId) {
    throw new Error('Record ID is required');
  }
  if (!attachmentField) {
    throw new Error('Attachment Field is required');
  }
  if (!fileContent) {
    throw new Error('File Content is required');
  }
  if (!fileName) {
    throw new Error('File Name is required');
  }

  // Log the action
  log(`Uploading "${fileName}" to Airtable record ${recordId}`);

  try {
    // Prepare the request URL
    const url = `https://content.airtable.com/v0/${baseId}/${recordId}/${attachmentField}/uploadAttachment`;

    // Prepare the request payload
    const payload = {
      contentType: contentType || 'application/octet-stream',
      file: fileContent,
      filename: fileName,
    };

    // Make the API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Airtable API error (${response.status}): ${errorText}`);
    }

    // Parse the response
    const data = await response.json();

    // Log success
    log(`Successfully uploaded "${fileName}" to Airtable`);

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error uploading attachment: ${errorMessage}`);
    throw error;
  }
};
