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
    formId,
    title,
    isPublic,
    metaDescription,
    metaTitle,
    allowIndexing,
    workspaceId,
    themeId,
    outputVariable,
  } = inputs;

  if (!formId) {
    throw new Error('Form ID is required');
  }

  // Build the patch operations array based on provided inputs
  const patchOperations = [];

  // Add title update if provided
  if (title !== undefined && title !== '') {
    patchOperations.push({
      op: 'replace',
      path: '/title',
      value: title,
    });
  }

  // Add public status update if provided
  if (isPublic !== undefined && isPublic !== '') {
    patchOperations.push({
      op: 'replace',
      path: '/settings/is_public',
      value: isPublic === 'true',
    });
  }

  // Add meta information updates if any are provided
  const metaUpdates: Record<string, any> = {};
  let hasMetaUpdates = false;

  if (metaDescription !== undefined && metaDescription !== '') {
    metaUpdates.description = metaDescription;
    hasMetaUpdates = true;
  }

  if (metaTitle !== undefined && metaTitle !== '') {
    metaUpdates.title = metaTitle;
    hasMetaUpdates = true;
  }

  if (allowIndexing !== undefined && allowIndexing !== '') {
    metaUpdates.allow_indexing = allowIndexing === 'true';
    hasMetaUpdates = true;
  }

  if (hasMetaUpdates) {
    patchOperations.push({
      op: 'replace',
      path: '/settings/meta',
      value: metaUpdates,
    });
  }

  // Add workspace update if provided
  if (workspaceId !== undefined && workspaceId !== '') {
    patchOperations.push({
      op: 'replace',
      path: '/workspace',
      value: {
        href: `https://api.typeform.com/workspaces/${workspaceId}`,
      },
    });
  }

  // Add theme update if provided
  if (themeId !== undefined && themeId !== '') {
    patchOperations.push({
      op: 'replace',
      path: '/theme',
      value: {
        href: `https://api.typeform.com/themes/${themeId}`,
      },
    });
  }

  // If no operations were provided, inform the user
  if (patchOperations.length === 0) {
    throw new Error(
      'No update operations provided. Please specify at least one field to update.',
    );
  }

  log(`Updating form ${formId} with ${patchOperations.length} operation(s)`);

  try {
    // Make the API request
    const response = await fetch(`https://api.typeform.com/forms/${formId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patchOperations),
    });

    if (!response.ok) {
      let errorMessage = `Failed to update form. Status: ${response.status}`;

      try {
        const errorData = await response.json();
        errorMessage += ` - ${JSON.stringify(errorData)}`;
      } catch (e) {
        // If parsing the error response fails, continue with the basic error message
      }

      throw new Error(errorMessage);
    }

    log(`Form updated successfully`);

    // Set the output variable with the result
    setOutput(outputVariable, {
      success: true,
      statusCode: response.status,
      message: 'Form updated successfully',
    });
  } catch (error) {
    log(
      `Error updating form: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
