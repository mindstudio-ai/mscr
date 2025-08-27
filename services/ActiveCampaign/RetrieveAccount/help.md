# Retrieve Account

This connector retrieves detailed information about a specific account from your ActiveCampaign instance.

## Prerequisites
- You need your ActiveCampaign API Key and Account URL configured in the connection settings
- You need to know the ID of the account you want to retrieve

## Configuration

### Account ID
Enter the numeric ID of the account you want to retrieve. This is typically a number like `1`, `42`, etc.

### Output Variable
Enter a name for the variable that will store the account information. This variable will contain all the account details returned by ActiveCampaign, including:
- name
- accountUrl
- createdTimestamp
- updatedTimestamp
- id
- links

## Example Usage

After configuring this connector, you can use the output variable in subsequent steps of your workflow. For example, if your output variable is named `accountDetails`, you can access specific properties like:

- `{{accountDetails.name}}` - The name of the account
- `{{accountDetails.accountUrl}}` - The URL of the account
- `{{accountDetails.id}}` - The ID of the account

## Troubleshooting

If you receive an error:
- Verify that the Account ID exists in your ActiveCampaign instance
- Check that your API Key and Account URL are correctly configured in the connection settings
- Ensure you have proper permissions to access account information