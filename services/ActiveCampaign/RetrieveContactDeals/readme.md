# Retrieve Contact Deals

This connector retrieves all deals associated with a specific contact in ActiveCampaign.

## Prerequisites

Before using this connector, you need to:

1. Have an ActiveCampaign account
2. Set up your API credentials in the connector settings:
   - **API Key**: Found in your ActiveCampaign account under Settings > Developer
   - **Base Account URL**: Your account URL (e.g., https://youraccount.api-us1.com)

## Configuration

### Contact Information

- **Contact ID**: Enter the numeric ID of the contact whose deals you want to retrieve. This is a required field.
  - Example: `123`

### Output

- **Output Variable**: Specify a name for the variable that will store the retrieved deals. This variable will contain an array of deal objects.

## Output Format

The connector returns an array of deal objects with the following structure:

```json
{
  "deals": [
    {
      "id": "3057",
      "title": "Acme Corp",
      "value": "494227",
      "currency": "usd",
      "status": "2",
      "contact": "8",
      "organization": "5",
      "stage": "4",
      "owner": "8",
      "cdate": "2021-06-30T15:27:44-05:00",
      "mdate": "2021-06-30T15:27:44-05:00",
      // Additional deal properties...
    }
    // More deals...
  ]
}
```

## Common Issues

- **404 Error**: This typically means the contact ID doesn't exist
- **Authentication Error**: Check that your API Key and Account URL are correct
- **Empty Response**: The contact may not have any associated deals