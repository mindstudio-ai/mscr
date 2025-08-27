# Remove Contact from Automation

This action removes a contact from a specific automation in ActiveCampaign.

## Configuration

### Contact Automation ID
Enter the ID of the contact-automation relationship you want to remove. This is a numeric identifier that represents the specific relationship between a contact and an automation.

You can find this ID in the ActiveCampaign dashboard or via the API. For example:
- When viewing automations in the ActiveCampaign interface
- By first making an API call to list contact automations

Example: `123`

### Output Variable
Enter a name for the variable that will store the result of this operation. The variable will contain a boolean value:
- `true` if the contact was successfully removed from the automation
- `false` if the operation failed

## Authentication

This connector requires:
1. **API Key** - Found in your ActiveCampaign account under Settings > Developer
2. **Base Account URL** - Your account-specific URL (e.g., https://youraccount.api-us1.com)

Make sure these are configured in the connector settings before using this action.

## Common Issues

- **403 Forbidden**: Check that your API key has the proper permissions
- **Not Found**: Verify that the Contact Automation ID exists and is valid
- **Connection Error**: Ensure your Base Account URL is correctly formatted