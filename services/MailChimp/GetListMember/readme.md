# Get List Member

This action retrieves detailed information about a specific member (subscriber) from a MailChimp list.

## Prerequisites

- You need a MailChimp account with API access
- Your MailChimp API Key must be configured in the connector settings
- Your MailChimp Server Prefix must be configured (e.g., "us19")
- You need to know your List ID

## Configuration

### List Information

- **List ID**: Enter the unique identifier for your MailChimp list. You can find this in your MailChimp account under Audience > Settings > Audience name and defaults.
  
- **Subscriber Email or ID**: Enter either:
  - The subscriber's email address (e.g., `user@example.com`)
  - The MD5 hash of the lowercase version of the subscriber's email address
  - The subscriber's contact_id

### Advanced Options

- **Fields to Include** (optional): A comma-separated list of specific fields you want to include in the response. This helps reduce response size if you only need certain data.
  
  Example: `email_address,status,merge_fields,tags`

- **Fields to Exclude** (optional): A comma-separated list of fields you want to exclude from the response.
  
  Example: `_links,stats`

### Output

- **Output Variable**: Name of the variable that will store the member information. This variable will contain a JSON object with all the member's details.

## Output Data

The output will include information such as:

- Email address
- Subscription status (subscribed, unsubscribed, cleaned, pending)
- Merge fields (custom fields like FNAME, LNAME)
- Tags applied to the member
- Subscription statistics
- Location data
- And more

## Common Issues

- If the member doesn't exist, the connector will return an error
- Make sure your API key has sufficient permissions to access audience data
- Double-check your List ID and subscriber information for accuracy