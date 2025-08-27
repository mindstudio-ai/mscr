# Retrieve Contact Goals

This connector retrieves the goals associated with a specific contact in your ActiveCampaign account.

## Prerequisites

- You need an ActiveCampaign account with API access
- Your API Key and Account URL should be configured in the service settings
- You need the ID of the contact whose goals you want to retrieve

## Configuration

### Contact Information

- **Contact ID**: Enter the numeric ID of the contact whose goals you want to retrieve. This is the unique identifier for the contact in ActiveCampaign.
  - Example: `123`

### Output

- **Output Variable**: Specify a name for the variable that will store the retrieved contact goals. This variable will contain an array of goal objects that you can use in subsequent steps of your workflow.

## What You'll Get

The output will be an array of contact goal objects with information such as:

- Goal ID
- Series ID
- Timestamp
- Related automation information
- Links to related resources

Example output:
```json
[
  {
    "goalid": "3",
    "seriesid": "2",
    "subscriberid": "5",
    "subscriberseriesid": "83",
    "timespan": "1",
    "tstamp": "2021-05-12T14:55:19-05:00",
    "id": "3",
    "goal": "3",
    "automation": "2",
    "contact": "5",
    "contactAutomation": "83",
    "links": {
      "goal": "https://example.api-us1.com/api/3/contactGoals/3/goal",
      "automation": "https://example.api-us1.com/api/3/contactGoals/3/automation",
      "contact": "https://example.api-us1.com/api/3/contactGoals/3/contact",
      "contactAutomation": "https://example.api-us1.com/api/3/contactGoals/3/contactAutomation",
      "contactGoalLists": "https://example.api-us1.com/api/3/contactGoals/3/contactGoalLists",
      "contactGoalTags": "https://example.api-us1.com/api/3/contactGoals/3/contactGoalTags"
    }
  }
]
```