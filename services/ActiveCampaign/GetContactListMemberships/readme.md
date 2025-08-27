# Retrieve Contact List Memberships

This action retrieves all list memberships for a specific contact in ActiveCampaign. It provides information about which lists a contact belongs to and their status in each list.

## Configuration

### Contact Information
- **Contact ID**: Enter the numeric ID of the contact whose list memberships you want to retrieve. You can find a contact's ID in the ActiveCampaign dashboard or by using the "Find Contact" action.
  - Example: `123`

### Output
- **Output Variable**: Specify a variable name to store the retrieved contact list memberships. This will contain the full response from ActiveCampaign including all list membership details.

## Output Format

The output will be a JSON object containing an array of the contact's list memberships with details such as:

```json
{
  "contactLists": [
    {
      "contact": "19",
      "list": "1",
      "status": "3",
      "sdate": "2021-04-08T11:17:44-05:00",
      "udate": "2021-05-12T11:10:06-05:00",
      "first_name": "John",
      "last_name": "Doe",
      "id": "19"
      // Additional fields...
    }
    // Additional list memberships...
  ]
}
```

## Status Codes

The "status" field in each list membership has these possible values:
- 1: Active/Subscribed
- 2: Unsubscribed
- 3: Active/Unconfirmed (hasn't clicked confirmation link yet)
- 4: Bounced

## Common Issues

- If you receive a 404 error, verify that the Contact ID exists in your ActiveCampaign account.
- Ensure your ActiveCampaign API credentials are correctly configured in the connector settings.