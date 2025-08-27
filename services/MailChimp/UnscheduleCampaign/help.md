# Unschedule a Mailchimp Campaign

This action allows you to unschedule a previously scheduled Mailchimp campaign that hasn't started sending yet.

## Prerequisites

- You need a Mailchimp account with API access
- You need to have already created and scheduled a campaign in Mailchimp
- The campaign must not have started sending yet

## Configuration

### Campaign Details

- **Campaign ID**: Enter the unique identifier for your Mailchimp campaign. This can be found in the URL when viewing your campaign in Mailchimp (e.g., `abc123def456`).

### Output

- **Success Message Variable**: Enter a name for the variable that will store the success message after the campaign is unscheduled. You can reference this variable in subsequent steps of your workflow.

## How It Works

When executed, this action will:
1. Connect to your Mailchimp account using your API credentials
2. Find the specified campaign by ID
3. Unschedule the campaign if it's currently scheduled
4. Return a success message that will be stored in your specified output variable

## Troubleshooting

- If you receive an error that the campaign wasn't found, double-check your Campaign ID
- If you receive an error that the campaign can't be unscheduled, it may have already started sending or may not be scheduled at all
- Make sure your Mailchimp API key and server prefix are correctly configured in the connector settings