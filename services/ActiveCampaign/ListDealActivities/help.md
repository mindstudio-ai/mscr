# List Deal Activities

This connector retrieves a list of deal activities from your ActiveCampaign account. Deal activities represent actions or changes related to deals, such as creation, updates, or associated tasks.

## Configuration

### Filters

- **Deal ID**: Optional. Enter a specific deal ID to only show activities for that deal.
- **Activity Type**: Optional. Filter activities by type:
  - All Activities: Show all activity types
  - User Activities: Show only user-related activities
  - Subscriber Activities: Show only subscriber-related activities
  - Task Activities: Show only task-related activities
  - Note Activities: Show only note-related activities
- **Exclude Email Activities**: Optional. Choose "Yes" to exclude email-related activities from the results.
- **Output Variable**: Required. The name of the variable where the list of deal activities will be stored.

## Output

The connector will return an array of deal activities with details such as:
- Deal ID
- User ID
- Activity type
- Timestamp
- Action performed
- Previous values (if applicable)

Example output:
```json
[
  {
    "d_id": "1361",
    "d_stageid": "0",
    "userid": "1",
    "dataId": "0",
    "dataType": "",
    "dataAction": "add",
    "dataOldval": "",
    "cdate": "2023-03-29T10:22:03-05:00",
    "sortdate": "2023-03-29T10:22:03-05:00",
    "id": "15110",
    "deal": "1361"
  },
  {
    "d_id": "1361",
    "d_stageid": "0",
    "userid": "1",
    "dataId": "1512",
    "dataType": "contact",
    "dataAction": "add",
    "dataOldval": "",
    "cdate": "2023-03-29T10:22:04-05:00",
    "sortdate": "2023-03-29T10:22:04-05:00"
  }
]
```

## Common Use Cases

- Tracking deal history and changes
- Monitoring user activity related to deals
- Auditing deal-related tasks and notes
- Building activity timelines for deals