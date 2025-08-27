# Retrieve Contact Automation

This action retrieves detailed information about an automation that a contact is enrolled in from your ActiveCampaign account.

## Configuration

### Contact Automation ID
Enter the unique identifier of the contact automation you want to retrieve. This is a numeric value that identifies the specific automation-contact relationship.

Example: `42`

### Output Variable
Specify a name for the variable that will store the response data. You can reference this variable in subsequent actions.

## Response Data

The output variable will contain the full contact automation details, including:

```json
{
  "contactAutomation": {
    "contact": "110",
    "seriesid": "2",
    "status": "2",
    "adddate": "2018-09-19T09:44:26-05:00",
    "completedElements": "1",
    "totalElements": "2",
    "completed": 1,
    "completeValue": 100,
    "id": "2",
    "automation": "2"
    // additional fields...
  }
}
```

## Status Codes

- `2`: Active/In Progress
- `1`: Complete
- `0`: Inactive

## Prerequisites

Make sure you've configured your ActiveCampaign account credentials in the connector settings:
- API Key
- Base Account URL (e.g., https://youraccount.api-us1.com)