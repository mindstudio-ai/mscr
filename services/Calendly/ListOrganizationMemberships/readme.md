# List Organization Memberships

This action retrieves a list of all users who are members of a specified Calendly organization.

## Configuration

### Organization UUID
Enter the UUID of the Calendly organization you want to list memberships for. This is a required field.

Example: `123e4567-e89b-12d3-a456-426614174000`

You can find your organization UUID in the Calendly admin dashboard or by using the "List Organizations" API endpoint.

### Count
The number of results to return per page. This is optional and defaults to 10 if not specified.

- Minimum: 1
- Maximum: 100

### Page Token
If you're paginating through a large result set, you can include the page token from a previous response to continue listing where that request left off. This field is optional.

### Output Variable
The name of the variable where the results will be stored. This variable will contain an object with:
- `collection`: An array of organization membership objects
- `pagination`: Information about pagination

## Example Response

```json
{
  "collection": [
    {
      "resource": {
        "uri": "https://api.calendly.com/organization_memberships/MEMBERSHIP_UUID",
        "role": "owner",
        "user": {
          "uri": "https://api.calendly.com/users/USER_UUID",
          "name": "John Doe",
          "email": "john.doe@example.com"
        },
        "organization": "https://api.calendly.com/organizations/ORGANIZATION_UUID",
        "updated_at": "2023-01-01T12:00:00.000000Z",
        "created_at": "2023-01-01T12:00:00.000000Z"
      }
    }
  ],
  "pagination": {
    "count": 10,
    "next_page": "https://api.calendly.com/organization_memberships?organization=ORGANIZATION_UUID&count=10&page_token=NEXT_PAGE_TOKEN"
  }
}
```