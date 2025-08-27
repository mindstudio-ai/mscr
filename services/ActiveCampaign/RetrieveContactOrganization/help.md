# Retrieve Contact Organization

This action retrieves organization information associated with a specific contact in your ActiveCampaign account.

## Prerequisites

- You need an ActiveCampaign account with API access
- Your API Key and Account URL must be configured in the ActiveCampaign service settings

## Configuration

### Contact ID

Enter the numeric ID of the contact whose organization information you want to retrieve. You can find a contact's ID in your ActiveCampaign dashboard or through other ActiveCampaign API calls.

Example: `123`

### Output Variable

Specify a variable name to store the organization information. This variable will contain an object with the organization details.

## Output Format

The output will be an object containing the organization details:

```json
{
  "name": "Organization Name",
  "created_timestamp": "2021-05-21T16:15:47-05:00",
  "updated_timestamp": "2021-08-24T06:28:56-05:00",
  "userid": "1",
  "id": "9",
  "owner": "1"
}
```

If the contact doesn't have an associated organization, the action will return an empty object.