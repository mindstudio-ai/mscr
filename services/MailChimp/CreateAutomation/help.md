# Create Automation

This action creates a new automation workflow in your MailChimp account.

## Prerequisites

- You need a MailChimp account with API access
- Your MailChimp API key must be configured in the environment variables
- Your MailChimp server prefix must be configured (e.g., us19)

## Configuration

### Basic Information

- **Automation Title**: Enter a descriptive name for your automation workflow
- **From Name**: Enter the name that will appear in the "From" field of emails sent by this automation
- **Reply-To Email**: Enter a valid email address where replies to the automation emails will be sent

### Audience Settings

- **List ID**: Enter the ID of the audience list to use for this automation
  - You can find this in your MailChimp account under Audience > Settings > Audience name and defaults
  - Example: `1a2df69xxx`
- **Store ID**: Enter the ID of your e-commerce store (only required for abandoned cart automations)
  - You can find this in your MailChimp account under Integrations > E-commerce > Your store > Settings
  - Example: `1a2df69xxx`

### Workflow Settings

- **Workflow Type**: Select the type of automation workflow to create:
  - **Abandoned Cart**: Sends emails to customers who added items to their cart but didn't complete checkout
  - **Welcome Series**: Sends a series of welcome emails to new subscribers
  - **API Triggered**: Automation that starts when triggered via API
  - **Date Added**: Automation that starts when a subscriber is added to a list
  - **Email Series**: A series of emails sent on a schedule

### Output

- **Output Variable**: Enter a name for the variable that will store the details of the created automation

## Notes

- Different workflow types may have different requirements. For example, abandoned cart automations require a Store ID.
- The automation will be created in a paused state. You'll need to activate it in your MailChimp account.
- For more information on automation workflows, see the [MailChimp documentation](https://mailchimp.com/help/automation/).