# List HeyReach Campaigns

This connector retrieves a paginated list of campaigns from your HeyReach account with filtering options.

## Configuration

### Filter Options

- **Search Keyword**: Optionally filter campaigns by name. For example, enter "Sales Campaign" to find campaigns with that phrase in their name.

- **Campaign Statuses**: Optionally filter campaigns by their status (Draft, Active, Paused, or Completed). You can select multiple statuses.

- **Account IDs**: Optionally filter campaigns by specific LinkedIn account IDs. Enter the IDs as comma-separated values (e.g., `123,456,789`).

### Pagination

- **Results Per Page**: Specify how many campaigns to return per page (1-100). Default is 10.

- **Page Offset**: Specify how many campaigns to skip (useful for pagination). Default is 0.

### Output

- **Output Variable**: Name of the variable that will store the returned campaigns list.

## Output Format

The connector returns a JSON object with:

- `totalCount`: Total number of campaigns matching your filters
- `items`: Array of campaign objects with details like:
  - `id`: Campaign ID
  - `name`: Campaign name
  - `status`: Current campaign status
  - `creationTime`: When the campaign was created
  - `progressStats`: Statistics about campaign progress
  - And other campaign properties

## Example Output

```json
{
  "totalCount": 25,
  "items": [
    {
      "id": 12345,
      "name": "Sales Outreach Q2",
      "creationTime": "2023-04-15T10:30:00Z",
      "linkedInUserListName": "Tech Companies SF",
      "linkedInUserListId": 67890,
      "campaignAccountIds": [123, 456],
      "status": "ACTIVE",
      "progressStats": {
        "totalUsers": 500,
        "totalUsersInProgress": 250,
        "totalUsersPending": 200,
        "totalUsersFinished": 40,
        "totalUsersFailed": 10
      },
      "excludeAlreadyMessagedGlobal": true,
      "excludeAlreadyMessagedCampaignAccounts": true,
      "excludeFirstConnectionCampaignAccounts": false,
      "excludeFirstConnectionGlobal": false,
      "excludeNoProfilePicture": true,
      "excludeListId": 11223
    },
    // Additional campaigns...
  ]
}
```