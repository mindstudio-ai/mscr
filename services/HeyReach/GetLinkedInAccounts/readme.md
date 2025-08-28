# Get LinkedIn Accounts

This connector allows you to retrieve a paginated list of LinkedIn accounts from your HeyReach workspace with optional filtering.

## Prerequisites

- You need a HeyReach account with API access
- Your HeyReach API key must be configured in the service settings

## Configuration

### Search Parameters

- **Keyword**: Optional filter to search for accounts by name. Leave empty to return all accounts.
- **Results Limit**: Maximum number of accounts to return per request (up to 100). Default is 10.
- **Results Offset**: Number of results to skip for pagination. Use this with the limit parameter to paginate through results. Default is 0.

### Output

- **Output Variable**: Name of the variable that will store the returned LinkedIn accounts data.

## Output Format

The connector returns an object with the following structure:

```json
{
  "totalCount": 25,
  "items": [
    {
      "id": 12345,
      "emailAddress": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isActive": true,
      "activeCampaigns": 3,
      "authIsValid": true,
      "isValidNavigator": true,
      "isValidRecruiter": false
    },
    // Additional accounts...
  ]
}
```

## Example Usage

1. Set the keyword to "sales" to find accounts with "sales" in their name
2. Set the limit to "20" to get up to 20 accounts
3. Set the offset to "0" to get the first page of results
4. Set the output variable to "linkedinAccounts"

You can then use `{{linkedinAccounts.items}}` in subsequent steps to access the array of accounts, or `{{linkedinAccounts.totalCount}}` to get the total number of matching accounts.