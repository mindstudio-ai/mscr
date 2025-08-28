import fetch from 'node-fetch';
import FormData from 'form-data';

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
    throw new Error('Missing Notion token');
  }

  const {
    fileUrl,
    filename,
    contentType: providedContentType,
    mode = 'single_part',
    outputVariable,
  } = inputs;

  if (!fileUrl) {
    throw new Error('File URL is required');
  }

  if (!filename) {
    throw new Error('Filename is required');
  }

  // Infer content type from filename if not provided
  const contentType = providedContentType || inferContentType(filename);

  log(`Downloading file from ${fileUrl}...`);

  // Download the file from the provided URL
  const fileResponse = await fetch(fileUrl);
  if (!fileResponse.ok) {
    throw new Error(`Failed to download file: ${fileResponse.statusText}`);
  }

  const fileBuffer = Buffer.from(await fileResponse.arrayBuffer());
  const fileSize = fileBuffer.length;

  log(`File downloaded (${formatFileSize(fileSize)})`);

  // Validate the selected mode based on file size
  if (mode === 'single_part' && fileSize > 20 * 1024 * 1024) {
    throw new Error(
      'File is larger than 20MB. Please use multi_part mode for files over 20MB.',
    );
  }

  // Step 1: Create a file upload
  log('Creating file upload request...');
  const createUploadResponse = await fetch(
    'https://api.notion.com/v1/file_uploads',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode,
        filename,
        content_type: contentType,
        ...(mode === 'multi_part' && {
          number_of_parts: calculateNumberOfParts(fileSize),
        }),
      }),
    },
  );

  if (!createUploadResponse.ok) {
    const errorText = await createUploadResponse.text();
    throw new Error(`Failed to create file upload: ${errorText}`);
  }

  const uploadData = (await createUploadResponse.json()) as {
    id: string;
  };
  log(`File upload created with ID: ${uploadData.id}`);

  // Step 2: Send the file
  if (mode === 'single_part') {
    // Single part upload
    log('Uploading file to Notion...');
    const form = new FormData();
    form.append('file', fileBuffer, {
      filename,
      contentType,
    });

    const sendFileResponse = await fetch(
      `https://api.notion.com/v1/file_uploads/${uploadData.id}/send`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Notion-Version': '2022-06-28',
          ...form.getHeaders(),
        },
        body: form,
      },
    );

    if (!sendFileResponse.ok) {
      const errorText = await sendFileResponse.text();
      throw new Error(`Failed to upload file: ${errorText}`);
    }

    const result = await sendFileResponse.json();
    log('File uploaded successfully!');
    setOutput(outputVariable, result);
  } else {
    // Multi-part upload
    const partSize = 5 * 1024 * 1024; // 5MB per part
    const numberOfParts = Math.ceil(fileSize / partSize);

    log(`Uploading file in ${numberOfParts} parts...`);

    for (let partNumber = 1; partNumber <= numberOfParts; partNumber++) {
      const start = (partNumber - 1) * partSize;
      const end = Math.min(partNumber * partSize, fileSize);
      const partBuffer = fileBuffer.slice(start, end);

      log(`Uploading part ${partNumber} of ${numberOfParts}...`);

      const form = new FormData();
      form.append('file', partBuffer, {
        filename,
        contentType,
      });
      form.append('part_number', String(partNumber));

      const sendPartResponse = await fetch(
        `https://api.notion.com/v1/file_uploads/${uploadData.id}/send`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Notion-Version': '2022-06-28',
            ...form.getHeaders(),
          },
          body: form,
        },
      );

      if (!sendPartResponse.ok) {
        const errorText = await sendPartResponse.text();
        throw new Error(`Failed to upload part ${partNumber}: ${errorText}`);
      }

      log(`Part ${partNumber} uploaded successfully`);
    }

    // Step 3: Complete the multi-part upload
    log('Completing multi-part upload...');
    const completeResponse = await fetch(
      `https://api.notion.com/v1/file_uploads/${uploadData.id}/complete`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
      },
    );

    if (!completeResponse.ok) {
      const errorText = await completeResponse.text();
      throw new Error(`Failed to complete file upload: ${errorText}`);
    }

    const result = await completeResponse.json();
    log('File upload completed successfully!');
    setOutput(outputVariable, result);
  }
};

// Helper function to infer content type from filename
function inferContentType(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase();

  const mimeTypes: Record<string, string> = {
    pdf: 'application/pdf',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    txt: 'text/plain',
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    xml: 'application/xml',
    zip: 'application/zip',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    mp3: 'audio/mpeg',
    mp4: 'video/mp4',
    wav: 'audio/wav',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
  };

  return extension && mimeTypes[extension]
    ? mimeTypes[extension]
    : 'application/octet-stream'; // Default binary type
}

// Helper function to calculate number of parts for multi-part upload
function calculateNumberOfParts(fileSize: number): number {
  const partSize = 5 * 1024 * 1024; // 5MB per part
  return Math.ceil(fileSize / partSize);
}

// Helper function to format file size in human-readable format
function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return bytes + ' bytes';
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(1) + ' KB';
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  } else {
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  }
}
