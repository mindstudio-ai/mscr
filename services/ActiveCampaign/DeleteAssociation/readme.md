# Delete Association

This action deletes an existing account-contact association in ActiveCampaign.

## When to use this action

Use this action when you need to remove a relationship between an account and a contact in your ActiveCampaign CRM.

## Configuration

### Association ID
Enter the unique identifier of the account-contact association you want to delete. This is a numeric value that can be found in your ActiveCampaign account or retrieved from a previous API call.

Example: `123`

## Important Notes

- This action permanently deletes the association and cannot be undone.
- If the association ID doesn't exist, you'll receive a 404 error.
- No data is returned when the deletion is successful.

## Environment Setup

Before using this action, make sure you've configured your ActiveCampaign connection with:
- **API Key**: Your ActiveCampaign API key
- **Base Account URL**: Your account URL (e.g., https://youraccount.api-us1.com)