# Retrieve Contact Notes

This connector retrieves all notes associated with a specific contact in ActiveCampaign.

## Prerequisites

Before using this connector, you need to:
1. Have an ActiveCampaign account
2. Set up your API credentials in the connector settings:
   - **API Key**: Found in your ActiveCampaign account under Settings > Developer
   - **Base Account URL**: Your account URL (e.g., `https://youraccount.api-us1.com`)

## Configuration

### Contact ID

Enter the ID of the contact whose notes you want to retrieve. This is a numeric identifier for the contact in ActiveCampaign.

Example: `42`

### Output Variable

Specify a variable name to store the retrieved notes. This will contain an array of note objects with details about each note associated with the contact.

## Output

The connector returns an array of note objects with the following properties:

```json
[
  {
    "id": "1",
    "note": "Here is a note!",
    "relid": "7",
    "reltype": "Subscriber",
    "userid": "1",
    "is_draft": "0",
    "cdate": "2022-02-04T14:21:28-06:00",
    "mdate": "2022-02-04T14:21:28-06:00",
    "user": "1",
    "owner": {
      "type": "contact",
      "id": "7"
    }
  }
]
```

If the contact has no notes, an empty array will be returned.