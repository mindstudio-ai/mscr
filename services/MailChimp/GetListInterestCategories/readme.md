# Get List Interest Categories

This connector retrieves interest categories from a specified Mailchimp list. Interest categories organize interests, which are used to group subscribers based on their preferences.

## Configuration

### List Configuration

- **List ID**: Enter the unique identifier for the Mailchimp list you want to retrieve interest categories from. You can find your list ID in your Mailchimp account under Audience > Settings > Audience name and defaults.

### Pagination Options

- **Count**: The number of records to return. Default is 10, maximum is 1000.
- **Offset**: Used for pagination, this is the number of records to skip. Default is 0.

### Filter Options

- **Interest Group Type**: Optionally filter results by a specific type of interest group:
  - All Types: Return all interest group types
  - Checkboxes: Return only checkbox-type interest groups
  - Dropdown: Return only dropdown-type interest groups
  - Radio Buttons: Return only radio button-type interest groups
  - Hidden: Return only hidden-type interest groups

### Output

- **Output Variable**: The name of the variable where the results will be stored. This variable will contain a JSON object with the list of interest categories.

## Example Response

The output will contain a JSON object with the following structure:

```json
{
  "list_id": "abc123def",
  "categories": [
    {
      "list_id": "abc123def",
      "id": "a1b2c3d4e5",
      "title": "Preferences",
      "display_order": 0,
      "type": "checkboxes"
    },
    {
      "list_id": "abc123def",
      "id": "f6g7h8i9j0",
      "title": "Topics",
      "display_order": 1,
      "type": "dropdown"
    }
  ],
  "total_items": 2
}
```

## Notes

- You must have a valid Mailchimp API key and server prefix configured in your service connection.
- The list ID must be valid and accessible with your API key.