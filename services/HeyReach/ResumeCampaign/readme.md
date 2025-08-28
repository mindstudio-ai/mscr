# Resume Campaign

This connector allows you to resume a paused HeyReach campaign.

## Prerequisites

- You need a valid HeyReach API key configured in your MindStudio environment
- You need the ID of a paused campaign that you want to resume

## Configuration

### Campaign Details

- **Campaign ID**: Enter the numeric ID of the campaign you want to resume. You can find campaign IDs in your HeyReach dashboard or by using the HeyReach API to list your campaigns.

### Output

- **Output Variable**: Enter a name for the variable that will store the campaign details after it has been resumed. This variable will contain information about the campaign including its ID, name, status, and progress statistics.

## Example Response

The output variable will contain a response similar to this:

```json
{
  "totalCount": 1,
  "items": [
    {
      "id": 123456789,
      "name": "My Campaign",
      "creationTime": "2023-01-01T12:00:00Z",
      "linkedInUserListName": "My LinkedIn List",
      "linkedInUserListId": 987654321,
      "campaignAccountIds": [1, 2],
      "status": null,
      "progressStats": {
        "totalUsers": 100,
        "totalUsersInProgress": 20,
        "totalUsersPending": 70,
        "totalUsersFinished": 5,
        "totalUsersFailed": 5
      },
      "excludeAlreadyMessagedGlobal": true,
      "excludeAlreadyMessagedCampaignAccounts": true,
      "excludeFirstConnectionCampaignAccounts": false,
      "excludeFirstConnectionGlobal": false,
      "excludeNoProfilePicture": true,
      "excludeListId": 123123
    }
  ]
}
```

## Notes

- If the campaign is already running, the API will still process the request successfully
- If the campaign ID doesn't exist, you'll receive an error