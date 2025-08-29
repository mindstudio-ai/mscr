# Invite User to Calendly Organization

This action allows you to invite users to join your Calendly organization by sending an invitation email to their email address.

## Prerequisites

- You need to have an active Calendly account with organization admin privileges
- You need to know your Organization UUID (found in your Calendly organization settings)

## Configuration

### Organization UUID

Enter the UUID of your Calendly organization. This is a unique identifier in the format:
```
00000000-0000-0000-0000-000000000000
```

You can find your Organization UUID:
1. Log in to your Calendly account
2. Go to your Organization settings
3. Look for the Organization UUID in the settings or URL

### Email Address

Enter the email address of the person you want to invite to your organization. This should be a valid email address in the format:
```
user@example.com
```

## Advanced Options

### Output Variable (Optional)

If you want to store the response from Calendly (which includes details about the invitation), specify a variable name here. The response will contain information such as:
- Invitation UUID
- Organization UUID
- Email address
- Status of the invitation
- Created at timestamp

## What Happens Next

When you run this action, Calendly will send an invitation email to the specified email address. The recipient will need to accept the invitation to join your organization.