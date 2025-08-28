# Get Survey from MailChimp

This action retrieves detailed information about a specific survey from your MailChimp account.

## Prerequisites

- You need a MailChimp account with API access
- Your MailChimp API key and server prefix must be configured in the service settings
- The survey must already exist in your MailChimp account

## Configuration

### List ID

Enter the unique identifier for the MailChimp list that contains the survey. You can find list IDs in your MailChimp account under Audience settings or via the MailChimp API.

Example: `a1b2c3d4e5`

### Survey ID

Enter the unique identifier for the specific survey you want to retrieve. You can find survey IDs in your MailChimp account when viewing survey details or via the MailChimp API.

Example: `survey123456`

### Output Variable

Specify a name for the variable that will store the survey details. This variable will contain all information about the survey as returned by the MailChimp API.

## Output

The action returns a complete survey object containing all details about the requested survey, including:
- Survey title and description
- Questions and possible answers
- Creation date and status
- Response statistics
- And other survey metadata

## Troubleshooting

If you encounter errors:
- Verify your List ID and Survey ID are correct
- Ensure the survey exists in the specified list
- Check that your MailChimp API credentials are valid and have appropriate permissions