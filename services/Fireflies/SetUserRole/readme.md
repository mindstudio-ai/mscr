# Set User Role - Fireflies.ai

This connector allows you to update a user's role within your Fireflies.ai team.

## Prerequisites

- You need a Fireflies.ai API key configured in your MindStudio environment variables.
- You must have admin privileges in your Fireflies.ai team to change user roles.

## Configuration

### User Information

- **User ID**: Enter the unique identifier of the user whose role you want to change. This is not the user's email address, but their internal Fireflies user ID.
- **Role**: Select the role you want to assign to the user:
  - **Admin**: Grants administrative privileges to the user
  - **User**: Sets the user to a standard user role

### Output

- **Output Variable**: Enter a name for the variable that will store the updated user information. The output will include the user's name and admin status.

## Example Response

```json
{
  "name": "Justin Fly",
  "is_admin": "true"
}
```

## Common Errors

- **object_not_found**: The team was not found
- **not_in_team**: The user is not part of your team
- **require_elevated_privilege**: You don't have admin privileges to change user roles
- **admin_must_exist**: You cannot remove admin status from the last admin in a team
- **invalid_args**: The provided arguments are invalid

## Notes

- You must have at least one admin in your team at all times.
- Only team admins can change user roles.