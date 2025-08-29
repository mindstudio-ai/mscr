# Remove User from Organization

This connector allows you to remove a member from your Calendly organization. This is useful when someone leaves your team or no longer needs access to your organization's Calendly resources.

## Required Information

### Organization Membership UUID
You need to provide the UUID of the organization membership you want to remove. This is a unique identifier for the user's membership in your organization.

**Format example:** `12345678-1234-1234-1234-123456789abc`

You can find this UUID by:
1. Using the "List Organization Memberships" connector (if available)
2. Using the Calendly API directly: `GET https://api.calendly.com/organization_memberships`
3. Checking the URL when viewing a user in your Calendly organization settings

### Output Variable
Specify a name for the variable that will store the result of this operation. This variable will contain a success message if the removal is completed successfully.

## What Happens When You Run This Connector

When executed, this connector will:
1. Send a request to Calendly to remove the specified user from your organization
2. The user will immediately lose access to your organization's Calendly resources
3. Store a success message in your specified output variable

## Permissions Required

You must have admin privileges in your Calendly organization to remove users. The OAuth connection used by this connector must have the appropriate scopes to manage organization memberships.

## Common Issues

- **404 Error**: This occurs if the membership UUID doesn't exist or has already been removed
- **403 Error**: This happens if your account doesn't have permission to remove users
- **401 Error**: This indicates an authentication issue with your Calendly connection