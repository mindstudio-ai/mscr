# Get Organization Membership

This connector retrieves detailed information about a user's membership in a Calendly organization.

## When to use this connector

Use this connector when you need to:
- Verify a user's membership status in your Calendly organization
- Check a user's role within your organization
- Retrieve details about a specific organization membership

## Required information

### Organization Membership UUID
This is the unique identifier for the organization membership you want to retrieve. You can find this UUID:
- In the URL when viewing a user in your Calendly organization dashboard
- From the response of other Calendly API calls that list organization memberships

The UUID follows this format: `12345678-1234-1234-1234-123456789012`

### Output Variable
Specify a name for the variable that will store the organization membership details. This variable will contain a JSON object with information such as:
- User details (name, email, etc.)
- Organization details
- User's role in the organization
- Status of the membership

## Example response

The output variable will contain data similar to this:

```json
{
  "resource": {
    "uri": "https://api.calendly.com/organization_memberships/12345678-1234-1234-1234-123456789012",
    "role": "owner",
    "user": {
      "uri": "https://api.calendly.com/users/ABCDEFGHIJKLMNOPQRST",
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    "organization": {
      "uri": "https://api.calendly.com/organizations/ABCDEFGHIJKLMNOPQRST"
    },
    "updated_at": "2023-01-01T12:00:00.000000Z",
    "created_at": "2022-01-01T12:00:00.000000Z"
  }
}
```

## Notes
- This connector uses Calendly's V2 API
- Authentication is handled automatically through your connected Calendly account