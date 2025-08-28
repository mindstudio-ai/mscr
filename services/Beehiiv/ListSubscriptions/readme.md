# List Subscriptions

This connector allows you to retrieve a list of subscribers from your Beehiiv publication. You can filter the results by email, subscription status, and tier.

## Configuration

### Publication Information
- **Publication ID**: Enter your Beehiiv publication ID, which starts with `pub_` followed by a UUID (e.g., `pub_00000000-0000-0000-0000-000000000000`). You can find this in your Beehiiv dashboard.

### Filtering Options
- **Email Address**: (Optional) Filter results to find a specific subscriber by their email address.
- **Subscription Status**: (Optional) Filter subscribers by their current status (active, inactive, validating, etc.).
- **Subscription Tier**: (Optional) Filter subscribers by their tier (free or premium).

### Pagination Options
- **Results Per Page**: (Optional) Number of subscribers to return per page (1-100). Default is 10.
- **Sort Direction**: (Optional) Choose to sort by creation date, either newest first (desc) or oldest first (asc).

### Output
- **Output Variable**: Name of the variable where the list of subscribers will be stored. This variable will contain an array of subscriber objects.

## Example Response

The output will be an array of subscriber objects with properties like:

```json
[
  {
    "id": "sub_00000000-0000-0000-0000-000000000000",
    "email": "example@example.com",
    "status": "active",
    "created": 1666800076,
    "subscription_tier": "free",
    "subscription_premium_tier_names": ["Premium", "Gold"],
    "utm_source": "Twitter",
    "utm_medium": "organic",
    "utm_channel": "website",
    "tags": ["Premium", "Active", "Engaged"],
    "stats": {
      "emails_received": 25,
      "open_rate": 60.1,
      "click_through_rate": 25
    }
  },
  // Additional subscribers...
]
```

## Notes
- This connector uses cursor-based pagination to efficiently retrieve all matching subscribers.
- For large subscriber lists, the results will be limited by the "Results Per Page" setting.