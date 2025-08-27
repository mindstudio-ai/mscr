# Get Campaign Open Details

This connector retrieves detailed information about campaign emails that were opened by list members for a specific Mailchimp campaign.

## Prerequisites

- You need a Mailchimp account with API access
- You need to have created at least one campaign in Mailchimp
- You need to have configured your Mailchimp API Key and Server Prefix in the MindStudio environment variables

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique identifier for the campaign you want to analyze. You can find this in the URL when viewing a campaign in Mailchimp or via the Mailchimp API.

### Filter Options

- **Number of Records**: The number of open records to return (default: 10, maximum: 1000)
- **Offset**: Number of records to skip for pagination (default: 0)
- **Since Date**: Optional filter to only show opens after a specific date and time (format: YYYY-MM-DD HH:MM:SS)
- **Sort By**: Choose to sort results by opens count
- **Sort Direction**: Choose the sort order (ascending or descending)

### Output

- **Output Variable**: Name of the variable that will store the campaign open details response

## Output Format

The connector returns detailed information about campaign opens, including:

- List of members who opened the campaign
- Email addresses of members who opened
- Number of times each member opened the campaign
- Timestamps for each open event
- Total number of opens for the campaign

## Example Use Cases

- Analyze which subscribers are most engaged with your campaigns
- Identify the best time of day for email opens
- Create targeted follow-up campaigns for subscribers who opened a specific campaign