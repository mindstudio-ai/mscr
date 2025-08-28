# Get LinkedIn Account

This connector allows you to retrieve detailed information about a LinkedIn account from HeyReach by its ID.

## Prerequisites

- A HeyReach account with API access
- Your HeyReach API key (configured in the service settings)

## Configuration

### Account ID

Enter the numeric ID of the LinkedIn account you want to retrieve information for. This is a required field.

### Output Variable

Specify a name for the variable that will store the account information. This variable will contain a JSON object with the following properties:

- `id`: Account ID (integer)
- `emailAddress`: Email address associated with the account
- `firstName`: First name of the account owner
- `lastName`: Last name of the account owner
- `isActive`: Whether the account is active (boolean)
- `activeCampaigns`: Number of active campaigns (integer)
- `authIsValid`: Whether the authentication is valid (boolean)
- `isValidNavigator`: Whether the account has valid Navigator access (boolean)
- `isValidRecruiter`: Whether the account has valid Recruiter access (boolean)

## Example Usage

After configuring this connector, you can use the output variable in subsequent steps of your workflow to access the LinkedIn account information.

For example, if your output variable is named `linkedinAccount`, you can reference properties like:

- `{{linkedinAccount.firstName}}` - to get the first name
- `{{linkedinAccount.emailAddress}}` - to get the email address
- `{{linkedinAccount.isActive}}` - to check if the account is active