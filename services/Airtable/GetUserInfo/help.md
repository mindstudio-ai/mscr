# Get User Info

This connector retrieves information about the authenticated Airtable user associated with your API token.

## What it does

When executed, this connector will:

1. Make a request to Airtable's API using your authentication token
2. Retrieve the user's ID and potentially other information
3. Store the results in the variables you specify

## Output Variables

- **User ID Variable** (Required): The unique identifier for your Airtable user account
- **Email Variable** (Optional): The email address associated with your account (only returned if your token has the `user.email:read` scope)
- **Scopes Variable** (Optional): The list of permission scopes associated with your token (only returned for OAuth access tokens)

## Authentication

This connector uses the Airtable authentication token configured in your connection settings. No additional authentication information is needed.

## Example Use Cases

- Verify that your Airtable connection is working properly
- Retrieve your user ID for use in other Airtable operations
- Check what permissions your current token has

## Troubleshooting

If you encounter errors:
- Verify your Airtable API token is valid and properly configured
- Check that your token has the necessary permissions for the information you're trying to retrieve