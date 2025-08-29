# Revoke Organization Invitation

This connector allows you to revoke a pending invitation for a user to join your Calendly organization. Once revoked, the invitation link will no longer work, and the user will not be able to join your organization with that invitation.

## Prerequisites

- You must have administrator permissions in your Calendly organization
- The invitation must be in a pending state (not yet accepted)

## Configuration

### Invitation Details

- **Invitation UUID**: Enter the unique identifier of the invitation you want to revoke. This UUID can be found:
  - In the URL of the invitation email
  - By using the "List Organization Invitations" connector to view all pending invitations
  - In the Calendly dashboard under Organization > Members > Pending Invitations

Example UUID format: `0b42c8b5-3894-4c33-9c36-f4c3d5c5c4c0`

### Response Configuration

- **Success Message Variable**: Enter a name for the variable that will store the success message after the invitation is revoked. You can reference this variable in subsequent steps of your workflow.

## What Happens

When this connector runs:
1. It sends a request to Calendly to revoke the specified invitation
2. If successful, the invitation is immediately invalidated
3. The success message is stored in your specified output variable

## Notes

- This action cannot be undone. Once an invitation is revoked, you'll need to send a new invitation if you want to invite the user again.
- If the invitation UUID doesn't exist or has already been accepted/revoked, the connector will return an error.