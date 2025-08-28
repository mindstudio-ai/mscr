# Unpublish a Mailchimp Survey

This action allows you to unpublish a survey that has been previously published in Mailchimp.

## Prerequisites

- You need a Mailchimp account with API access
- You need to have created and published a survey in Mailchimp
- You need to have configured your Mailchimp API Key and Server Prefix in the connector settings

## Required Information

### List ID
This is the unique identifier for your Mailchimp audience (formerly called "list"). You can find this in your Mailchimp account:
1. Go to Audience > All Contacts
2. Click on the "Settings" dropdown
3. Select "Audience name and defaults"
4. The Audience ID is displayed at the bottom of the page (e.g., `1a2b3c4d5e`)

### Survey ID
This is the unique identifier for the survey you want to unpublish. You can find this:
1. Navigate to the survey in your Mailchimp account
2. Look at the URL in your browser - it will contain the survey ID
3. The format is typically alphanumeric (e.g., `abc123def456`)

## What happens when this action runs?

When this action runs, it will:
1. Connect to the Mailchimp API using your credentials
2. Send a request to unpublish the specified survey
3. Return the survey data in the output variable you specify

## Output

The action returns the survey instance data after unpublishing it. This data will be stored in the output variable you specify.