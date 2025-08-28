# Get Subscription by ID

This connector retrieves a single subscription by ID from your beehiiv publication.

## Configuration

### Publication ID
Enter your beehiiv publication ID, which starts with `pub_`. You can find this in your beehiiv dashboard URL or in the API section of your beehiiv account.

Example: `pub_12345678-1234-1234-1234-123456789012`

### Subscription ID
Enter the ID of the specific subscription you want to retrieve. Subscription IDs start with `sub_`.

Example: `sub_12345678-1234-1234-1234-123456789012`

### Expand Options
Optionally select additional data to include in the response:

- **Subscription Premium Tiers**: Returns details about premium tiers the subscription is associated with
- **Referrals**: Returns information about subscriptions referred by this subscription
- **Stats**: Returns statistics about the subscription
- **Custom Fields**: Returns custom field values set on the subscription
- **Tags**: Returns tags set on the subscription

### Output Variable
Enter a name for the variable that will store the subscription data. You can reference this variable in subsequent steps of your workflow.

## Response Data

The connector returns subscription details including:

- Subscription ID
- Email address
- Status (validating, invalid, pending, active, inactive, needs_attention)
- Creation date
- Subscription tier (free or premium)
- Premium tier names (if applicable)
- UTM parameters
- Referral information