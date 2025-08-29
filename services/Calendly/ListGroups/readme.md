# List Groups

This connector retrieves a list of groups in your Calendly organization. Groups are collections of users within an organization that can be used for scheduling, permissions, and other organizational purposes.

## Configuration

### Query Parameters

- **Count**: The number of results to return per page (between 1 and 100). If not specified, the default is 10.
  
- **Page Token**: Used for pagination. Include a page token to retrieve the next page of results. Leave this empty when retrieving the first page.

### Output

- **Output Variable**: The name of the variable where the results will be stored. This variable will contain an object with:
  - `groups`: An array of group objects from your Calendly organization
  - `pagination`: Information about pagination, including the next page token if more results are available

## Example Response

```json
{
  "groups": [
    {
      "uri": "https://api.calendly.com/organization_memberships/groups/ABCDEF123456",
      "name": "Sales Team",
      "created_at": "2023-01-15T10:00:00.000000Z",
      "updated_at": "2023-01-15T10:00:00.000000Z"
    },
    {
      "uri": "https://api.calendly.com/organization_memberships/groups/GHIJKL789012",
      "name": "Marketing Team",
      "created_at": "2023-01-20T14:30:00.000000Z",
      "updated_at": "2023-01-20T14:30:00.000000Z"
    }
  ],
  "pagination": {
    "count": 10,
    "next_page": "https://api.calendly.com/organization_memberships/groups?count=10&page_token=NEXT_PAGE_TOKEN",
    "next_page_token": "NEXT_PAGE_TOKEN",
    "previous_page": null,
    "previous_page_token": null
  }
}
```

## Notes

- This connector requires OAuth authentication, which is handled automatically by the platform.
- The maximum number of results per page is 100.
- Use the page token from the pagination information to retrieve subsequent pages of results.