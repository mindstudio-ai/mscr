# Get Campaign Leads from HeyReach

This connector allows you to retrieve leads from a HeyReach campaign. It corresponds to the "Lead Analytics" screen in the HeyReach UI and shows leads with their current status.

## Configuration

### Campaign Information
- **Campaign ID**: Enter the numeric ID of the campaign you want to retrieve leads from. You can find this in the URL when viewing a campaign in HeyReach.

### Pagination Options
- **Offset**: The number of records to skip (for pagination). Use 0 to start from the beginning.
- **Limit**: The maximum number of records to return per request (maximum 100).

### Time Filtering
- **Time Filter Type**: Choose how to filter leads based on time:
  - **Creation Time**: Filter leads by when they were created (requires From and To dates)
  - **No Time Filter**: No specific time filtering is applied

- **From Date**: If using Creation Time filter, specify the start date in ISO 8601 format (e.g., `2024-10-06T17:34:00+02:00`)
- **To Date**: If using Creation Time filter, specify the end date in ISO 8601 format (e.g., `2024-10-07T17:36:00+02:00`)

### Output
- **Output Variable**: Name of the variable where the campaign leads data will be stored.

## Response Data Structure

The connector returns data in the following format:

```json
{
  "totalCount": 152,
  "items": [
    {
      "id": 62658,
      "linkedInUserProfileId": "AC9sANasasasX0Ia-q6DQxyS35UD7a8716G5c8",
      "linkedInUserProfile": {
        "linkedin_id": "58344979",
        "profileUrl": "https://www.linkedin.com/in/johndoe",
        "firstName": "John",
        "lastName": "Doe",
        "headline": "Communications and Marketing Professional",
        "imageUrl": "https://media.licdn.com/dms/image/...",
        "location": "Princetown",
        "companyName": "ACME",
        "companyUrl": null,
        "position": "",
        "about": null,
        "connections": 0,
        "followers": 0,
        "emailAddress": null
      },
      "lastActionTime": "2024-10-01T03:28:22.414791Z",
      "failedTime": null,
      "creationTime": "2024-09-30T21:28:06.933349Z",
      "leadCampaignStatus": "Finished",
      "leadConnectionStatus": "None",
      "leadMessageStatus": "None",
      "errorCode": null,
      "leadCampaignStatusMessage": null,
      "linkedInSenderId": 1108,
      "linkedInSenderFullName": "Jane Doe"
    }
  ]
}
```

## Lead Status Values

- **leadCampaignStatus**: Possible values include "Pending", "InSequence", "Finished", "Paused", "Failed"
- **leadConnectionStatus**: Possible values include "None", "ConnectionSent", "ConnectionAccepted"
- **leadMessageStatus**: Possible values include "None", "MessageSent", "MessageReply"