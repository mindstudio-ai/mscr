# List Accounts

This connector retrieves all existing accounts from your ActiveCampaign CRM.

## Configuration

### Search by Name
Optionally filter accounts by name. Leave this empty to retrieve all accounts.

### Include Contact & Deal Counts
- **Yes**: Includes accurate counts of contacts and deals associated with each account
- **No**: Returns counts as 0 (faster response time)

### Output Variable
The name of the variable where the accounts data will be stored. This will contain an array of account objects with properties like:

```json
[
  {
    "id": "1",
    "name": "Example Account",
    "accountUrl": null,
    "createdTimestamp": "2023-01-01T12:00:00-05:00",
    "updatedTimestamp": "2023-01-01T12:00:00-05:00",
    "contactCount": "5",
    "dealCount": "2"
  },
  // More accounts...
]
```

## Requirements

This connector requires:
- Your ActiveCampaign API Key
- Your ActiveCampaign Base Account URL

These should be configured in the service settings.