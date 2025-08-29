# Get Current User

This action retrieves information about the currently authenticated Calendly user associated with your OAuth token.

## What This Action Does

When executed, this action will:
1. Make a request to the Calendly API to fetch details about the current user
2. Return comprehensive user information including name, email, timezone, and scheduling URL
3. Store the complete user profile in your specified output variable

## Configuration

### Output Variable
Enter a name for the variable that will store the user information. You'll be able to use this variable in subsequent steps of your workflow.

## Output Data Structure

The output variable will contain a JSON object with the following structure:

```json
{
  "resource": {
    "uri": "https://api.calendly.com/users/ABCDEFGHIJKLMNOPQRST",
    "name": "John Doe",
    "slug": "john-doe",
    "email": "john.doe@example.com",
    "scheduling_url": "https://calendly.com/john-doe",
    "timezone": "America/New_York",
    "avatar_url": "https://calendly-cdn.com/uploads/user/avatar/ABCDEFGHIJKLMNOPQRST/avatar.png",
    "created_at": "2020-01-01T00:00:00.000000Z",
    "updated_at": "2023-01-01T00:00:00.000000Z"
  }
}
```

## Common Use Cases

- Retrieve user details before performing other Calendly operations
- Get the user's timezone for scheduling-related workflows
- Access the user's scheduling URL to share with others
- Verify account information as part of an authentication flow

## Requirements

- A valid Calendly OAuth connection must be established before using this action