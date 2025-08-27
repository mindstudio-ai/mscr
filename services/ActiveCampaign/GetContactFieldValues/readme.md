# Get Contact Field Values

This action retrieves all custom field values for a specific contact in your ActiveCampaign account.

## Configuration

### Contact ID
Enter the ID of the contact whose field values you want to retrieve. This is a numeric identifier for the contact in your ActiveCampaign account.

Example: `123`

### Output Variable
Specify a variable name to store the retrieved field values. This will contain an array of all custom field values associated with the contact.

## Output Format

The output will be an array of field value objects with the following structure:

```json
[
  {
    "id": "1",
    "contact": "5",
    "field": "1",
    "value": "United States",
    "cdate": "2021-05-12T14:19:38-05:00",
    "udate": "2021-05-12T14:54:57-05:00",
    "created_by": "0",
    "updated_by": "0",
    "owner": "5"
  },
  // Additional field values...
]
```

## Tips
- You can find a contact's ID in ActiveCampaign by viewing the contact and looking at the URL (it will contain `/contact/[ID]`)
- This action is useful for retrieving all custom field data for a contact before performing conditional logic or updating specific fields