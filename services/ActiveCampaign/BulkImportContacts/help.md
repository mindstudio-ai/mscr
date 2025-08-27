# Bulk Import Contacts

This connector allows you to import multiple contacts into ActiveCampaign at once. You can create new contacts, update existing ones, set custom fields, add tags, and subscribe contacts to lists.

## Configuration

### Contact Information

- **Contacts**: Enter your contacts in JSON format. Each contact must include at least an email address. You can import up to 250 contacts in a single request.

  Example format:
  ```json
  [
    {
      "email": "contact@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "phone": "123-456-7890",
      "customer_acct_name": "Company Name",
      "tags": ["customer", "newsletter"],
      "fields": [
        { "id": 1, "value": "value1" },
        { "id": 2, "value": "||value2||value3||" }
      ],
      "subscribe": [
        { "listid": 1 }
      ],
      "unsubscribe": [
        { "listid": 2 }
      ]
    }
  ]
  ```

- **Exclude Automations**: Set to "Yes" to skip running automations on imported contacts. This will improve import time.

### Advanced Options

- **Callback URL**: Optional URL to notify when the import is complete.
- **Callback Request Type**: HTTP method to use for the callback request (POST or GET).
- **Detailed Results**: Whether to include detailed results in the callback.

### Output

- **Output Variable**: The variable that will store the import result.

## Notes

- The maximum payload size must be less than 400KB.
- Rate limits: 20 requests per minute for single contact imports, 100 requests per minute for multiple contacts.
- For custom fields, you must use the ID assigned by ActiveCampaign. You can find these IDs using the "List all custom fields" API call.
- For multi-value fields, separate values with double-pipe delimiter ("||").
- Contacts cannot be subscribed to lists they have previously unsubscribed from.