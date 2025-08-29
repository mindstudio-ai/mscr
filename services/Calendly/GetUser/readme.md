# Get User

This action retrieves information about the current authenticated Calendly user.

## What it does

This connector makes a request to the Calendly API to fetch details about the user associated with your connected Calendly account. The returned information includes:

- User name
- Email address
- Scheduling URL
- Timezone
- Account creation date
- Last update date
- And other account details

## Configuration

### Output Variable

Enter a name for the variable that will store the user information. This variable will contain all the user data returned from Calendly and can be used in subsequent steps of your workflow.

## Example Response

The output variable will contain a response similar to this:

```json
{
  "resource": {
    "uri": "https://api.calendly.com/users/ABCDEFGHIJKLMNOPQRST",
    "name": "John Doe",
    "slug": "john-doe",
    "email": "john.doe@example.com",
    "scheduling_url": "https://calendly.com/john-doe",
    "timezone": "America/New_York",
    "created_at": "2020-01-01T00:00:00.000000Z",
    "updated_at": "2023-01-01T00:00:00.000000Z"
  }
}
```

## Authentication

This connector uses OAuth authentication that you've already set up when connecting your Calendly account to MindStudio.