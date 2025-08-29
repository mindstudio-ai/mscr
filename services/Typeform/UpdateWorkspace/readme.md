# Update Typeform Workspace

This connector allows you to update a Typeform workspace by changing its name and/or managing its members.

## Prerequisites

- You need to have a Typeform account with appropriate permissions to manage workspaces
- You need the Workspace ID of the workspace you want to update

## Configuration

### Workspace Details

- **Workspace ID**: Enter the unique identifier for the workspace you want to update. You can find this in the URL when viewing the workspace in Typeform, or via the Typeform API.

### Update Operations

You can perform one or more of the following operations:

- **Update Workspace Name**: Enter a new name for the workspace. Leave empty if you don't want to change the name.

- **Add Member Email**: Enter the email address of a person you want to add to the workspace.

- **Member Role**: Select the role for the new member:
  - **Owner**: Full control of the workspace, including ability to delete it
  - **Editor**: Can create, edit, and view forms in the workspace
  - **Viewer**: Can only view forms in the workspace

- **Remove Member Email**: Enter the email address of a member you want to remove from the workspace.

## Notes

- You must provide at least one update operation (name change, add member, or remove member)
- The email addresses must be valid and correctly formatted
- You cannot remove the last owner of a workspace
- If you're adding a member who is already in the workspace, their role will be updated

## Example Use Cases

- Rename a workspace to better reflect its purpose
- Add new team members to a workspace
- Change a team member's permissions by removing and re-adding them with a different role
- Remove team members who no longer need access