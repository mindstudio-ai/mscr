# Update Interest in Mailchimp

This connector allows you to update an existing interest (also known as a "group name") within a specific interest category in a Mailchimp list.

## Prerequisites

- You need a Mailchimp account with API access
- You need to have already created a list, interest category, and interest
- You'll need the List ID, Interest Category ID, and Interest ID

## Configuration

### List Information

- **List ID**: Enter the unique identifier for your Mailchimp list. You can find this in your Mailchimp account under Audience settings.
- **Interest Category ID**: Enter the ID of the interest category that contains the interest you want to update. You can find this in your Mailchimp account under Audience → Tags.
- **Interest ID**: Enter the ID of the specific interest you want to update. You can find this in your Mailchimp account under Audience → Tags, by clicking on the interest category.

### Interest Details

- **Interest Name**: Enter the new name for the interest. This is what will be shown publicly on subscription forms.
- **Display Order** (optional): Enter a numeric value to determine the order in which this interest appears in the list. Lower numbers appear first.

### Output

- **Output Variable**: Enter a name for the variable that will store the response from Mailchimp. This will contain the updated interest information.

## Example Response

The output variable will contain a response similar to:

```json
{
  "category_id": "abc123",
  "list_id": "def456",
  "id": "ghi789",
  "name": "Updated Interest Name",
  "subscriber_count": "42",
  "display_order": 1,
  "_links": [
    {
      "rel": "self",
      "href": "https://us19.api.mailchimp.com/3.0/lists/def456/interest-categories/abc123/interests/ghi789",
      "method": "GET"
    }
  ]
}
```

## Troubleshooting

- Make sure all IDs are correct. Incorrect IDs will result in a "Resource Not Found" error.
- Ensure your Mailchimp API key has sufficient permissions to modify lists.
- If you're having issues, check the Mailchimp API documentation for more details on interest management.