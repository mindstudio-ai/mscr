# Get Campaigns For Lead

This connector retrieves a list of campaigns where a specified lead exists in the HeyReach platform.

## Configuration

### Lead Information
You must provide at least one of the following identifiers to find a lead:

- **Email**: The email address of the lead (e.g., `john@example.com`)
- **LinkedIn ID**: The LinkedIn ID of the lead
- **LinkedIn Profile URL**: The full URL to the lead's LinkedIn profile (e.g., `https://www.linkedin.com/in/john_doe/`)

### Pagination
- **Offset**: The number of records to skip (default: 0)
- **Limit**: The maximum number of records to return (default: 100)

### Output
- **Output Variable**: The name of the variable where the results will be stored

## Response Format

The connector returns a JSON object with the following structure:

```json
{
  "leadFullName": "John Doe",
  "totalCount": 2,
  "items": [
    {
      "campaignId": 1082,
      "campaignName": "Campaign For Veterans",
      "campaignStatus": "PAUSED",
      "leadStatus": "Finished"
    },
    {
      "campaignId": 1451,
      "campaignName": "Campaign 5",
      "campaignStatus": "CANCELED",
      "leadStatus": "Finished"
    }
  ]
}
```

## Campaign Status Values
- DRAFT
- IN_PROGRESS
- PAUSED
- FINISHED
- CANCELED
- FAILED
- STARTING

## Lead Status Values
- Pending
- InSequence
- Finished
- Paused
- Failed
- Excluded
- PendingOrExcludedToBeCalculated