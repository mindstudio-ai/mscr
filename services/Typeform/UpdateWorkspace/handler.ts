export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Typeform connection.',
    );
  }

  const {
    workspaceId,
    updateName,
    addMemberEmail,
    memberRole,
    removeMemberEmail,
  } = inputs;

  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  // Build operations array based on provided inputs
  const operations: Array<{ op: string; path: string; value: any }> = [];

  // Add name update operation if provided
  if (updateName) {
    log(`Preparing to update workspace name to: ${updateName}`);
    operations.push({
      op: 'replace',
      path: '/name',
      value: updateName,
    });
  }

  // Add member operation if email and role are provided
  if (addMemberEmail && memberRole) {
    log(`Preparing to add member: ${addMemberEmail} with role: ${memberRole}`);
    operations.push({
      op: 'add',
      path: '/members',
      value: {
        email: addMemberEmail,
        role: memberRole,
      },
    });
  } else if (addMemberEmail && !memberRole) {
    log('Member role is required when adding a member');
  }

  // Add remove member operation if email is provided
  if (removeMemberEmail) {
    log(`Preparing to remove member: ${removeMemberEmail}`);
    operations.push({
      op: 'remove',
      path: '/members',
      value: {
        email: removeMemberEmail,
      },
    });
  }

  // Check if there are any operations to perform
  if (operations.length === 0) {
    log(
      'No update operations specified. Please provide at least one update operation.',
    );
    setOutput('success', false);
    setOutput('message', 'No update operations specified');
    return;
  }

  try {
    log('Sending update request to Typeform...');

    const response = await fetch(
      `https://api.typeform.com/workspaces/${workspaceId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(operations),
      },
    );

    if (!response.ok) {
      let errorText = '';
      try {
        const errorData = await response.json();
        errorText = JSON.stringify(errorData);
      } catch (e) {
        errorText = `Status code: ${response.status}`;
      }

      throw new Error(`Failed to update workspace: ${errorText}`);
    }

    log('Workspace updated successfully!');

    // Build a summary of what was updated
    const updateSummary = [];
    if (updateName) {
      updateSummary.push(`Updated name to "${updateName}"`);
    }
    if (addMemberEmail) {
      updateSummary.push(`Added member ${addMemberEmail}`);
    }
    if (removeMemberEmail) {
      updateSummary.push(`Removed member ${removeMemberEmail}`);
    }

    setOutput('success', true);
    setOutput(
      'message',
      `Workspace updated successfully. ${updateSummary.join('. ')}`,
    );
    setOutput('operations', operations);
  } catch (error) {
    log(`Error: ${error instanceof Error ? error.message : String(error)}`);
    setOutput('success', false);
    setOutput(
      'message',
      error instanceof Error ? error.message : String(error),
    );
  }
};
