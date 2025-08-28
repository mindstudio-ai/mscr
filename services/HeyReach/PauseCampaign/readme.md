# Pause HeyReach Campaign

This connector allows you to pause an active campaign in your HeyReach account.

## What You'll Need

- Your HeyReach API Key (should be configured in the service settings)
- The Campaign ID of the campaign you want to pause

## Configuration

### Campaign Information

- **Campaign ID**: Enter the numeric ID of the campaign you want to pause. You can find this ID in your HeyReach dashboard or by using the List Campaigns API endpoint.

### Response Handling

- **Output Variable**: Enter a name for the variable that will store the response data. This variable will contain information about the paused campaign and its current status.

## Example Response

The output variable will contain a JSON object with campaign details, including:

```json
{
  "totalCount": 1,
  "items": [
    {
      "id": 12345,
      "name": "My Campaign",
      "creationTime": "2023-05-01T12:00:00Z",
      "linkedInUserListName": "My LinkedIn List",
      "linkedInUserListId": 67890,
      "campaignAccountIds": [1234, 5678],
      "status": "Paused",
      "progressStats": {
        "totalUsers": 100,
        "totalUsersInProgress": 20,
        "totalUsersPending": 30,
        "totalUsersFinished": 45,
        "totalUsersFailed": 5
      },
      "excludeAlreadyMessagedGlobal": true,
      "excludeAlreadyMessagedCampaignAccounts": true,
      "excludeFirstConnectionCampaignAccounts": false,
      "excludeFirstConnectionGlobal": false,
      "excludeNoProfilePicture": true,
      "excludeListId": 11223
    }
  ]
}
```

## Error Handling

The connector will handle common errors and provide clear error messages:

- If the campaign ID is invalid or not found
- If your API key is invalid or expired
- If you've exceeded the rate limits for the API