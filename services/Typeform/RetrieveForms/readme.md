# Retrieve Forms from Typeform

This connector allows you to retrieve a list of forms from your Typeform account. You can search, filter, and sort the forms based on various parameters.

## Configuration Options

### Query Parameters

- **Search Term** - Optional. Filter forms that contain this specific text in their title or content.
- **Page** - Optional. The page number of results to retrieve (pagination). Default is 1.
- **Page Size** - Optional. Number of forms to return per page. Default is 10, maximum is 200.
- **Workspace ID** - Optional. Retrieve forms only from a specific workspace. You can find your workspace ID in the Typeform dashboard URL or workspace settings.
- **Sort By** - Optional. Choose to sort results by either:
  - Created At - When the form was created
  - Last Updated At - When the form was last modified
- **Order By** - Optional. Choose the sort order:
  - Ascending (oldest first)
  - Descending (newest first)

### Output

- **Output Variable** - Required. The name of the variable where the results will be stored. This variable will contain the complete response including form details, pagination information, and total count.

## Example Response

The output variable will contain a response like this:

```json
{
  "total_items": 25,
  "page_count": 3,
  "items": [
    {
      "id": "abcdef123456",
      "title": "Customer Feedback Survey",
      "created_at": "2023-06-15T10:30:45Z",
      "last_updated_at": "2023-07-20T14:22:18Z",
      "settings": {
        "is_public": true
      },
      "_links": {
        "display": "https://youraccount.typeform.com/to/abcdef123456",
        "self": {
          "href": "https://api.typeform.com/forms/abcdef123456"
        }
      }
    },
    // More forms...
  ]
}
```

## Notes

- This connector requires a valid Typeform account with API access.
- The results are paginated. If you have many forms, you may need to make multiple requests with different page numbers to retrieve all forms.
- To retrieve forms from a specific workspace, you need to know the workspace ID.