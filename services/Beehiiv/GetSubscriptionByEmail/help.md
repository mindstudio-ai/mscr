# Get Subscription by Email

This connector retrieves a single subscription belonging to a specific email address in your Beehiiv publication.

## Configuration

### Publication Details

- **Publication ID**: Enter your Beehiiv publication ID, which starts with `pub_`. You can find this in your Beehiiv dashboard.
  
  Example: `pub_12345678-1234-1234-1234-123456789012`

- **Email Address**: Enter the email address of the subscriber you want to retrieve information for.
  
  Example: `subscriber@example.com`

### Additional Options

- **Include Additional Data**: Select what additional data you want to include in the response:
  - **None**: Basic subscription data only
  - **Stats**: Include open rates and other engagement metrics
  - **Custom Fields**: Include any custom fields associated with the subscriber
  - **Referrals**: Include referral information
  - **Tags**: Include tags associated with the subscriber
  - **All**: Include all available additional data

### Output

- **Output Variable**: Name of the variable that will store the subscription information. You can reference this variable in subsequent steps of your workflow.

## Response Data

The connector will return subscription data including:

- Subscription ID
- Email address
- Status (validating, invalid, pending, active, inactive, needs_attention)
- Creation date
- Subscription tier
- UTM parameters
- Any additional data you selected to include

## Authentication

This connector uses your Beehiiv API key which should be configured in the Beehiiv service settings.