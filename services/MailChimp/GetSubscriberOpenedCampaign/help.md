# Get Subscriber Info for Opened Campaign

This action retrieves detailed information about a specific subscriber who opened a Mailchimp campaign.

## Required Fields

### Campaign ID
Enter the unique identifier for your Mailchimp campaign. You can find this in your Mailchimp account or in the URL when viewing a campaign.

Example: `abc123def`

### Subscriber Hash
Enter the MD5 hash of the lowercase version of the subscriber's email address. You can generate this using an MD5 hash generator.

Example: `00000000000000000000000000000000`

### Output Variable
Enter a name for the variable that will store the subscriber information. You can reference this variable in subsequent steps of your workflow.

## Optional Parameters

### Fields to Include
Specify which fields you want to include in the response. This is a comma-separated list of field names. You can reference nested fields using dot notation.

Example: `email_address,opens_count,opens`

### Fields to Exclude
Specify which fields you want to exclude from the response. This is a comma-separated list of field names. You can reference nested fields using dot notation.

Example: `_links,merge_fields`

## Response Data

The action returns information about the subscriber, including:

- Email address
- Number of times they opened the campaign
- Timestamps of each open event
- List membership status
- Merge field data
- VIP status
- And more

You can use this data to personalize follow-up communications or segment your audience based on engagement.