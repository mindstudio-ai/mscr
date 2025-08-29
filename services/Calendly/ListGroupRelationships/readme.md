# List Group Relationships

This connector retrieves a list of users who are members of a specified Calendly group.

## Configuration

### Group Configuration

- **Group URI**: Enter the full URI of the Calendly group for which you want to list relationships. This is the unique identifier for the group.
  - Example: `https://api.calendly.com/groups/ABCDEF123456`
  - You can find your group URI in the Calendly dashboard under Organization Settings > Groups, or by using the List Groups API endpoint.

### Pagination Options

- **Count**: The number of results to return per page. Maximum value is 100.
  - Default: 100
  - Recommended to leave at default unless you need a smaller batch size.

- **Page Token**: For paginating through large result sets. Leave empty for the first page.
  - When processing multiple pages, use the page token returned in the previous response.

### Output Configuration

- **Output Variable**: The name of the variable where the results will be stored.
  - The output will contain an array of group membership objects and pagination information.

## Output Format

The connector returns an object with the following structure:

```json
{
  "collection": [
    {
      "uri": "https://api.calendly.com/group_memberships/ABCDEF123456",
      "group": "https://api.calendly.com/groups/GHIJKL789012",
      "user": "https://api.calendly.com/users/MNOPQR345678",
      "created_at": "2023-01-01T12:00:00.000000Z",
      "updated_at": "2023-01-01T12:00:00.000000Z"
    },
    // Additional group memberships...
  ],
  "pagination": {
    "count": 100,
    "next_page": "https://api.calendly.com/group_memberships?count=100&page_token=NEXT_PAGE_TOKEN",
    "previous_page": null,
    "next_page_token": "NEXT_PAGE_TOKEN"
  }
}
```

## Use Cases

- Retrieve all users in a specific group for reporting or management
- Sync group membership information with other systems
- Verify user access and permissions within your organization