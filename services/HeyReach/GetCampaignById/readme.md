# Get Campaign by ID

This action retrieves detailed information about a specific campaign from your HeyReach account.

## Configuration

### Campaign ID
Enter the numeric ID of the campaign you want to retrieve. This is a required field.

Example: `12345`

### Output Variable
Specify a name for the variable that will store the campaign details. This variable will contain all information about the campaign including:

- Basic details (ID, name, creation time)
- LinkedIn user list information
- Campaign account IDs
- Progress statistics (total users, users in progress, pending, finished, failed)
- Exclusion settings

## Usage Notes

- You need a valid HeyReach API key configured in your service connection
- The action will return an error if the campaign ID doesn't exist
- Rate limits may apply based on your HeyReach account tier

## Example Response

```json
{
  "id": 12345,
  "name": "Q4 Outreach Campaign",
  "creationTime": "2023-10-15T14:30:00Z",
  "linkedInUserListName": "Tech Decision Makers",
  "linkedInUserListId": 67890,
  "campaignAccountIds": [123, 456],
  "status": null,
  "progressStats": {
    "totalUsers": 500,
    "totalUsersInProgress": 125,
    "totalUsersPending": 300,
    "totalUsersFinished": 50,
    "totalUsersFailed": 25
  },
  "excludeAlreadyMessagedGlobal": true,
  "excludeAlreadyMessagedCampaignAccounts": false,
  "excludeFirstConnectionCampaignAccounts": true,
  "excludeFirstConnectionGlobal": false,
  "excludeNoProfilePicture": true,
  "excludeListId": 78901
}
```