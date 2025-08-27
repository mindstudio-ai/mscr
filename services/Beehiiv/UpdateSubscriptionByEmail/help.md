# Update Subscription by Email

This connector allows you to update a subscriber's information in your beehiiv publication, including their subscription tier, custom fields, and subscription status.

## Configuration

### Subscription Information
- **Publication ID**: Enter your beehiiv publication ID, which starts with `pub_` followed by a UUID (e.g., `pub_00000000-0000-0000-0000-000000000000`). You can find this in your beehiiv dashboard.
- **Subscriber Email**: Enter the email address of the subscriber you want to update.

### Update Options
- **Subscription Tier**: Select the tier you want to set for this subscription - either "Free" or "Premium".
- **Stripe Customer ID**: If applicable, enter the Stripe Customer ID associated with this subscription (e.g., `cus_12345abcde`).
- **Unsubscribe**: Select "Yes" if you want to unsubscribe this subscriber from your publication, otherwise select "No".

### Custom Fields
Custom fields allow you to update subscriber metadata. Enter a JSON array of objects, where each object contains a `name` and `value` property.

**Example:**
```json
[
  {
    "name": "First Name",
    "value": "John"
  },
  {
    "name": "Last Name",
    "value": "Doe"
  },
  {
    "name": "Company",
    "value": "Acme Inc."
  }
]
```

### Output
- **Output Variable**: Enter a name for the variable that will store the updated subscription information. This variable will contain the complete subscription object returned by the beehiiv API.

## Response Data

The output variable will contain the updated subscription information, including:
- Subscription ID
- Email address
- Subscription status
- Creation date
- Subscription tier
- UTM parameters
- Referral information

## Notes
- You can only update existing custom fields. To add new custom fields, use the beehiiv dashboard.
- The API requires a valid beehiiv API key to be configured in your environment variables.