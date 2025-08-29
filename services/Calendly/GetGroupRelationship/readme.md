# Get Group Relationship

This connector retrieves information about the relationship between a Calendly group and its members.

## What You'll Need

- **Group UUID**: The unique identifier for the Calendly group you want to retrieve relationship information for. This can be found in the URL when viewing a group in Calendly or through the Calendly API.

## Configuration

### Group UUID
Enter the UUID of the group you want to retrieve information about. The UUID should be in the format:
```
123e4567-e89b-12d3-a456-426614174000
```

### Output Variable
Specify a name for the variable that will store the group relationship information. This variable will contain details about the group membership, including information about users who are members of the specified group.

## Example Response

The connector will return data similar to this:

```json
{
  "collection": [
    {
      "resource": {
        "uri": "https://api.calendly.com/group_memberships/12345",
        "group": "https://api.calendly.com/organizations/ABCDE/groups/12345",
        "user": "https://api.calendly.com/users/FGHIJ",
        "role": "member",
        "created_at": "2023-01-01T00:00:00.000000Z",
        "updated_at": "2023-01-01T00:00:00.000000Z"
      }
    }
  ],
  "pagination": {
    "count": 1,
    "next_page": null,
    "previous_page": null,
    "next_page_token": null,
    "previous_page_token": null
  }
}
```

## Troubleshooting

- Make sure the Group UUID is valid and correctly formatted
- Verify that your Calendly account has access to the specified group
- Check that your Calendly integration has the necessary permissions to access group information