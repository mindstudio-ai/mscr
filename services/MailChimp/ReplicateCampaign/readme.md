# Replicate Campaign

This action creates a copy of an existing Mailchimp campaign. The replicated campaign will have the same content, settings, and configuration as the original campaign.

## Prerequisites

- You need your Mailchimp API key configured in the service settings
- You need the server prefix (e.g., us19) configured in the service settings
- You need an existing campaign ID to replicate

## Configuration

### Campaign ID

Enter the unique identifier of the campaign you want to replicate. This is a string that looks like `123abc456def`.

You can find your campaign ID by:
1. Going to your Mailchimp account
2. Navigating to Campaigns
3. Selecting the campaign you want to replicate
4. Looking at the URL - the campaign ID is typically at the end of the URL

### Output Variable

Enter a name for the variable that will store the information about the newly created campaign. This variable will contain details such as the new campaign ID, web ID, status, and other campaign properties.

## What Happens

When this action runs, it will:
1. Connect to your Mailchimp account
2. Create an exact copy of the specified campaign
3. Return the details of the new campaign in your output variable

The replicated campaign will be in "save" status, allowing you to make changes before sending it.