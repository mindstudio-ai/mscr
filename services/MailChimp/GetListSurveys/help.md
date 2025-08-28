# Get List Surveys

This connector retrieves information about all available surveys for a specific MailChimp list.

## Prerequisites

- You need a MailChimp account with API access
- Your MailChimp API key must be configured in the service settings
- Your MailChimp server prefix must be configured in the service settings
- You need at least one list (audience) created in your MailChimp account

## Configuration

### List ID

Enter the unique identifier for the MailChimp list (audience) you want to retrieve surveys from. 

To find your List ID:
1. Log in to your MailChimp account
2. Go to Audience → All contacts
3. Click on the "Current audience" dropdown and select the audience you want
4. Click on "Settings" and then "Audience name and defaults"
5. The Audience ID is displayed at the bottom of the page (e.g., `a1b2c3d4e5`)

### Output Variable

Enter a name for the variable that will store the survey results. This variable will contain an array of all surveys associated with the specified list.

## Example Usage

After configuring this connector, you can use the output variable in subsequent steps of your workflow to access the survey data. For example, you might use it to:

- Display survey information in a user interface
- Process survey data for reporting
- Pass survey IDs to other MailChimp actions