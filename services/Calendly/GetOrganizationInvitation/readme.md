# Get Organization Invitation

This connector retrieves detailed information about a specific organization invitation in Calendly.

## Prerequisites
- You must have a Calendly account with organization admin permissions
- The Calendly integration must be connected in MindStudio

## Configuration

### Invitation Details
- **Invitation UUID**: Enter the unique identifier for the invitation you want to retrieve
  - This is the UUID portion of the invitation URL or can be found in the Calendly dashboard
  - Example: `0e8b4bda-25a0-4df6-a420-526dd7cffcf2`

### Output
- **Output Variable**: Enter a name for the variable that will store the invitation details
  - Example: `invitationDetails`

## Output Format

The connector will return a JSON object containing the invitation details with the following structure:

```json
{
  "resource": {
    "uri": "https://api.calendly.com/organization_invitations/0e8b4bda-25a0-4df6-a420-526dd7cffcf2",
    "created_at": "2023-01-01T12:00:00.000000Z",
    "email": "user@example.com",
    "organization": "https://api.calendly.com/organizations/ABCDEF",
    "status": "pending",
    "updated_at": "2023-01-01T12:00:00.000000Z",
    "user": null
  }
}
```

The `status` field will show whether the invitation is `pending`, `accepted`, or `declined`.

## Common Issues

- **404 Error**: This usually means the invitation UUID doesn't exist or has been deleted
- **401/403 Error**: Check that your Calendly integration is properly connected with the right permissions