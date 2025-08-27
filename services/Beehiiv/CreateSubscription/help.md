# Create Subscription in Beehiiv

This action creates a new subscription (subscriber) for your Beehiiv publication.

## Required Information

- **Publication ID**: Your Beehiiv publication ID, which starts with `pub_`. You can find this in your Beehiiv dashboard under Publication Settings.
- **Email**: The email address of the person you want to subscribe to your publication.

## Optional Settings

### Subscriber Options
- **Reactivate Existing**: Choose "Yes" to reactivate a previously unsubscribed email. Only use this when the subscriber has explicitly requested to resubscribe.
- **Send Welcome Email**: Choose "Yes" to send your publication's welcome email to the new subscriber.

### Tracking Information
- **UTM Source**: Where the subscriber came from (e.g., "Twitter", "Facebook", "Newsletter")
- **UTM Medium**: How they found you (e.g., "organic", "paid", "referral")
- **UTM Campaign**: Specific campaign name (e.g., "spring_promo_2023")
- **Referring Site**: Website that referred the subscriber (e.g., "www.example.com/blog")
- **Referral Code**: If another subscriber referred them, enter their referral code here

### Subscription Tier
- **Tier**: Choose between "Free" or "Premium" subscription level

### Custom Fields
- **Custom Fields**: JSON array of any custom fields you've set up in Beehiiv. Must be formatted as shown below:

```json
[
  {
    "name": "First Name",
    "value": "John"
  },
  {
    "name": "Last Name",
    "value": "Doe"
  }
]
```

## Output
The action returns the newly created subscription data, including the subscription ID, status, and other details.