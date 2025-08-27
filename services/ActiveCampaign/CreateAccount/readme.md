# Create Account in ActiveCampaign

This action creates a new account in your ActiveCampaign CRM.

## Configuration

### Account Information

- **Account Name**: Enter the name of the account you want to create. This field is required.
- **Website URL**: Optionally enter the website URL associated with this account (e.g., `https://www.example.com`).
- **Owner ID**: Optionally specify the user ID of the account owner. If not provided, it defaults to user ID 1.

### Custom Fields (Optional)

- **Custom Fields**: You can add custom field values for the account in JSON format. Each custom field should include the `customFieldId` and `fieldValue`. For currency fields, you can also include `fieldCurrency`.

Example custom fields JSON:
```json
[
  {
    "customFieldId": 9,
    "fieldValue": "500-1000"
  },
  {
    "customFieldId": 20,
    "fieldValue": 1234,
    "fieldCurrency": "GBP"
  }
]
```

Leave this field as an empty array `[]` if you don't want to set any custom fields.

### Output

- **Output Variable**: Specify a variable name to store the created account information. This will contain the full response from ActiveCampaign, including the new account ID and other details.

## Example Response

The output variable will contain a response similar to:

```json
{
  "account": {
    "name": "Example Account",
    "accountUrl": "https://www.example.com",
    "createdTimestamp": "2023-06-12T16:52:16-05:00",
    "updatedTimestamp": "2023-06-12T16:52:16-05:00",
    "fields": [...],
    "id": "1"
  }
}
```
