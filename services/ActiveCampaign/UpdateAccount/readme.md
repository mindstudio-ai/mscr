# Update Account in ActiveCampaign

This action allows you to update an existing account in ActiveCampaign.

## Configuration

### Account Information

- **Account ID**: The unique identifier of the account you want to update. This is required.
- **Account Name**: The new name you want to set for the account.
- **Account Website URL**: The website URL associated with the account.
- **Account Owner ID**: The user ID of the person who will own this account. If not specified, it defaults to 1.

### Custom Fields

- **Custom Fields (JSON)**: A JSON array of custom field objects. Each object should include the `customFieldId` and `fieldValue`. You can optionally include `fieldCurrency` for currency fields.

Example format:
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

### Output

- **Output Variable**: The name of the variable where the API response will be stored. This will contain the updated account information.

## Notes

- You must have at least one field to update. If you don't specify any fields, the API will return an error.
- Custom field IDs must exist in your ActiveCampaign account.
- The API response will include all account information, including fields you didn't modify.