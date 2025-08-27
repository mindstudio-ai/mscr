# Retrieve Association

This connector retrieves an existing account-contact association from ActiveCampaign by its ID. An association represents the relationship between an account and a contact in your ActiveCampaign CRM.

## Prerequisites

- You need an ActiveCampaign account with API access
- Your API Key and Account URL must be configured in the connector settings

## Configuration

### Association ID

Enter the unique identifier of the account-contact association you want to retrieve. This is a numeric ID that can be found in the URL when viewing an association in ActiveCampaign or through a previous API call.

Example: `18`

### Output Variable

Specify a name for the variable that will store the association details. This variable will contain all the information about the association, including:

- Account ID
- Contact ID
- Job Title
- Creation and update timestamps
- Association ID

## Example Response

```json
{
  "account": "2",
  "contact": "1",
  "jobTitle": "Product Manager",
  "createdTimestamp": "2019-06-26T11:26:09-05:00",
  "updatedTimestamp": "2019-06-26T11:26:09-05:00",
  "id": "18"
}
```

## Common Issues

- **404 Error**: This typically means the association ID does not exist. Double-check the ID and try again.
- **Authentication Error**: Ensure your API key and account URL are correctly configured in the connector settings.
