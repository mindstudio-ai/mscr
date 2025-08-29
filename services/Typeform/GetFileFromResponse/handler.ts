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
    throw new Error(
      'Missing authentication token. Please check your connection settings.',
    );
  }

  const {
    formId,
    responseId,
    fieldId,
    filename,
    inline = 'false',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!formId) {
    throw new Error('Form ID is required');
  }
  if (!responseId) {
    throw new Error('Response ID is required');
  }
  if (!fieldId) {
    throw new Error('Field ID is required');
  }
  if (!filename) {
    throw new Error('Filename is required');
  }

  // Construct the API URL
  const apiUrl = `https://api.typeform.com/forms/${formId}/responses/${responseId}/fields/${fieldId}/files/${filename}?inline=${inline}`;

  log(`Retrieving file "${filename}" from Typeform...`);

  try {
    // Make the API request
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle error responses
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API token.');
      } else if (response.status === 404) {
        throw new Error(
          'File not found. Please verify the form ID, response ID, field ID, and filename.',
        );
      } else if (response.status === 400) {
        throw new Error('Bad request. Please check your input parameters.');
      } else {
        throw new Error(
          `Failed to retrieve file: ${response.status} ${response.statusText}`,
        );
      }
    }

    // Get the file content and content type
    const blob = await response.blob();
    const contentType =
      response.headers.get('content-type') || 'application/octet-stream';

    // Convert blob to Buffer
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    log('File retrieved successfully. Uploading to storage...');

    // Upload the file to the platform's storage
    const fileUrl = await uploadFile(buffer, contentType);

    log('File uploaded successfully.');

    // Set the output variable to the file URL
    setOutput(outputVariable, fileUrl);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while retrieving the file');
  }
};
