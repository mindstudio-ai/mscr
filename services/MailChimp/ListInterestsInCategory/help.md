# List Interests in Category

This connector retrieves a list of interests from a specific interest category in your MailChimp list.

## Prerequisites

- A MailChimp account with API access
- Your MailChimp API key and server prefix configured in the service settings
- At least one list (audience) with interest categories created in your MailChimp account

## Configuration

### Required Fields

- **List ID**: Enter the unique ID for your MailChimp list (audience). You can find this in the MailChimp dashboard by going to Audience > Settings > Audience name and defaults. The List ID appears in the form of a string like `a1b2c3d4e5`.

- **Interest Category ID**: Enter the unique ID for the interest category. You can find this by going to your audience, clicking "Manage Audience" > "Signup forms" > "Form builder" > "Categories" and looking at the URL when you edit a category. The ID is in the URL as `interest_categories/[ID]`.

- **Output Variable**: Name of the variable that will store the retrieved interests data.

### Optional Parameters

- **Count**: The number of records to return. Default is 10, maximum is 1000.

- **Offset**: Number of records to skip for pagination. Default is 0.

## Output

The connector will store the results in your specified output variable. The output is a JSON object containing:

```json
{
  "interests": [
    {
      "id": "abc123",
      "name": "Technology",
      "subscriber_count": "42",
      "display_order": 1
    },
    {
      "id": "def456",
      "name": "Marketing",
      "subscriber_count": "37",
      "display_order": 2
    }
  ],
  "list_id": "your_list_id",
  "category_id": "your_category_id",
  "total_items": 2
}
```

## Common Issues

- **Authentication errors**: Ensure your API key and server prefix are correctly configured in the service settings.
- **Resource not found**: Verify that the List ID and Interest Category ID are correct and exist in your MailChimp account.
- **Rate limiting**: MailChimp has API rate limits. If you encounter rate limiting errors, try reducing the frequency of your requests.