# List Organization Invitations

This connector retrieves a list of pending invitations for your Calendly organization.

## Setup

1. **Organization URI** - Enter the URI of your Calendly organization
   - Format: `https://api.calendly.com/organizations/ORGANIZATION_UUID`
   - You can find your organization UUID in your Calendly account settings or by using the Calendly API to list your organizations

2. **Pagination Options** (optional)
   - **Count**: Maximum number of results to return per page (1-100)
   - **Page Token**: Token for retrieving subsequent pages of results
     - Leave empty for the first page
     - For subsequent pages, use the `next_page_token` value from the previous response

3. **Output Variable** - Name of the variable where the results will be stored

## Output

The connector returns a JSON object containing:

```json
{
  "collection": [
    {
      "created_at": "2023-01-01T12:00:00.000000Z",
      "email": "user@example.com",
      "last_sent_at": "2023-01-01T12:00:00.000000Z",
      "organization": "https://api.calendly.com/organizations/ORGANIZATION_UUID",
      "status": "pending",
      "updated_at": "2023-01-01T12:00:00.000000Z",
      "uri": "https://api.calendly.com/organization_invitations/INVITATION_UUID",
      "user": null
    }
    // Additional invitations...
  ],
  "pagination": {
    "count": 25,
    "next_page": null,
    "next_page_token": null,
    "previous_page": null,
    "previous_page_token": null
  }
}
```

## Notes

- This connector only retrieves pending invitations
- You must have admin permissions in the organization to view invitations
- The Calendly account connected to MindStudio must have access to the specified organization