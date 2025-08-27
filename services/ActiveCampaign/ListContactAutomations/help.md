# List Contact Automations

This connector retrieves a list of all automations that a specific contact is enrolled in within your ActiveCampaign account.

## Configuration

### Contact Information
- **Contact ID**: Enter the numeric ID of the contact whose automations you want to retrieve. This is the internal ActiveCampaign contact ID, not an email address or other identifier.

### Output
- **Output Variable**: Specify a name for the variable that will store the results. This variable will contain the complete response from ActiveCampaign, including all automation details for the contact.

## Example Response

The output will contain data similar to this:

```json
{
  "contactAutomations": [
    {
      "contact": "10003",
      "seriesid": "1",
      "status": "2",
      "adddate": "2018-11-16T02:32:33-06:00",
      "remdate": "2018-11-16T02:32:33-06:00",
      "completed": 1,
      "completeValue": 100,
      "id": "1",
      "automation": "1"
    }
  ],
  "meta": {
    "total": "1"
  }
}
```

## Notes
- You must have a valid ActiveCampaign API key configured in your environment settings.
- The contact must exist in your ActiveCampaign account for this connector to return results.
- If the contact is not enrolled in any automations, the response will contain an empty array.