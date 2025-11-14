# Add Favorites (Bulk)

Adds multiple items to favorites in a single operation.

## Configuration
- **Favorites JSON**: Array of favorites to add
- **Output Variable**: Variable for results

## Example Input
```json
[
  {"type": "sheet", "objectId": 123456789},
  {"type": "workspace", "objectId": 987654321},
  {"type": "folder", "objectId": 555666777}
]
```

## Notes
- More efficient than adding one at a time
- All items added in single API call
- Maximum 100 items per request

