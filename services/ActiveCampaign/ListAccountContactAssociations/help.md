# List Account-Contact Associations

This connector retrieves all existing account-contact associations from your ActiveCampaign account. You can optionally filter the results by Contact ID and/or Account ID.

## Prerequisites

- You must have your ActiveCampaign API Key and Base Account URL configured in the connector settings.
- Your API key can be found in your ActiveCampaign account under Settings > Developer.

## Configuration

### Filter Options

- **Contact ID** (Optional): Enter a numeric Contact ID to filter results to show only associations for a specific contact. Leave blank to retrieve associations for all contacts.

- **Account ID** (Optional): Enter a numeric Account ID to filter results to show only associations for a specific account. Leave blank to retrieve associations for all accounts.

- **Output Variable**: Enter a name for the variable that will store the API response. This variable will contain the full list of account-contact associations and can be used in subsequent steps of your workflow.

## Output

The output variable will contain the complete API response with the following structure:

```json
{
  "accountContacts": [
    {
      "account": "2",
      "contact": "3",
      "jobTitle": "Product Manager",
      "createdTimestamp": "2019-06-26T10:49:10-05:00",
      "updatedTimestamp": "2019-06-26T10:49:10-05:00",
      "links": {
        "account": "...",
        "contact": "..."
      },
      "id": "17"
    },
    // Additional account-contact associations...
  ],
  "meta": {
    "total": "3",
    // Additional metadata...
  }
}
```

## Example Use Cases

- Retrieve all account-contact relationships to analyze customer data
- Get a list of contacts associated with a specific account for targeted communications
- Find all accounts associated with a specific contact for account management
