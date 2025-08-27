# Delete Account

This connector allows you to delete an existing account in ActiveCampaign.

## Configuration

### Account Details
- **Account ID**: Enter the numeric ID of the account you want to delete. This is a required field.

### Confirmation
- **Confirmation**: Select "Yes, delete this account" to confirm the deletion. This is a safety measure to prevent accidental deletions. The default is set to "No, do not delete this account".

### Output
- **Result Variable**: Enter a name for the variable that will store the result of the operation. On successful deletion, this variable will contain `{ success: true }`.

## Important Notes

- This action permanently deletes an account and cannot be undone.
- You must have appropriate permissions in ActiveCampaign to delete accounts.
- Make sure you have the correct Account ID before proceeding with deletion.

## Authentication

This connector uses your ActiveCampaign API credentials that are configured at the service level:
- API Key
- Base Account URL
