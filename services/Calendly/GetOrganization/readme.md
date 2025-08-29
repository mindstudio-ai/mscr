# Get Organization

This connector retrieves detailed information about a Calendly organization using the Calendly API V2.

## Configuration

### Organization UUID
Enter the UUID of the organization you want to retrieve information about. This is a unique identifier for your Calendly organization.

You can find your organization UUID:
- In your Calendly account settings
- From other Calendly API responses
- In the URL of your Calendly organization page (format: `1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p`)

### Output Variable
Specify a name for the variable where the organization details will be stored. This variable will contain all the information returned by the Calendly API about your organization, including:

- Organization name
- Organization slug
- Creation date
- Last update date
- Organization URI
- Other organization metadata

## Authentication

This connector uses OAuth authentication which is managed by the platform. You need to have connected your Calendly account to use this connector.

## Example Response

```json
{
  "resource": {
    "uri": "https://api.calendly.com/organizations/ABCDEFGHIJKL",
    "name": "My Organization",
    "slug": "my-organization",
    "created_at": "2020-01-01T00:00:00.000000Z",
    "updated_at": "2021-01-01T00:00:00.000000Z"
  }
}
```