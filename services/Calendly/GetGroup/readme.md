# Get Group - Calendly

This connector retrieves detailed information about a specific Calendly group.

## Configuration

### Group Information

- **Group UUID**: Enter the unique identifier for the Calendly group you want to retrieve information about. 
  - This can be found in the URL when viewing a group in Calendly (e.g., `123e4567-e89b-12d3-a456-426614174000`)
  - Example URL format: `https://calendly.com/organizations/org_name/teams/team_id/groups/your_group_uuid`

### Output

- **Output Variable**: Specify a name for the variable that will store the group details. This variable will contain all information returned by Calendly about the group, including:
  - Group UUID
  - Name
  - Members
  - Created and updated timestamps
  - Other group metadata

## Example Response

The output variable will contain a JSON object similar to:

```json
{
  "resource": {
    "uri": "https://api.calendly.com/groups/ABCDE12345",
    "name": "Sales Team",
    "created_at": "2023-01-15T09:30:00.000000Z",
    "updated_at": "2023-06-20T14:45:00.000000Z"
  }
}
```

## Notes

- You must have proper permissions to access group information in your Calendly account
- If the group doesn't exist or you don't have access to it, the connector will return an appropriate error message