# List Contacts

Lists all contacts in your Smartsheet account.

## Configuration
- **Output Variable**: Variable to store contacts list

## Example Response
```json
{
  "totalCount": 3,
  "contacts": [
    {
      "id": "abc123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  ]
}
```

## Notes
- Returns all contacts accessible to the authenticated user
- Contacts are used in contact list columns

