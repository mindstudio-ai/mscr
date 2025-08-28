# Add Subscription to Automation

This connector adds an existing subscriber to a Beehiiv automation flow. The automation must have an active "Add by API" trigger enabled.

## Prerequisites

- You need a Beehiiv account with API access
- Your API key must be configured in the connector settings
- The automation must have an "Add by API" trigger set up

## Configuration

### Automation Details

- **Publication ID**: Enter your Beehiiv publication ID, which starts with `pub_`. You can find this in your Beehiiv dashboard.
  
  Example: `pub_12345678-1234-1234-1234-123456789012`

- **Automation ID**: Enter the ID of the automation you want to add the subscriber to. This starts with `aut_`.
  
  Example: `aut_12345678-1234-1234-1234-123456789012`

### Subscriber Information

- **Email Address**: The email address of the existing subscriber you want to add to the automation.
  
  Example: `subscriber@example.com`
  
  *Note: You must provide either an Email Address or a Subscription ID.*

- **Subscription ID**: Alternatively, you can provide the subscription ID of the existing subscriber. This starts with `sub_`.
  
  Example: `sub_12345678-1234-1234-1234-123456789012`

- **Override Double Opt-in**: Choose whether to override your publication's double opt-in settings for this subscription.
  - **Don't override**: Use your publication's default settings
  - **Skip double opt-in**: Bypass the double opt-in requirement

### Output

- **Output Variable**: Enter a name for the variable that will store the automation journey details.

## What happens

When this connector runs, it will:

1. Find the existing subscriber by email or subscription ID
2. Add them to the specified automation flow
3. Return details about the automation journey, including its status and timestamps

If the subscriber is found, they will be enrolled in the automation immediately.