# Add Subscription Tags

This action adds one or more tags to a subscriber in your beehiiv publication. Tags help you segment your audience for targeted campaigns and analytics.

## Configuration

### Subscription Details
- **Publication ID**: Enter your beehiiv publication ID, which starts with `pub_`. You can find this in your beehiiv dashboard under Settings > API.
- **Subscription ID**: Enter the ID of the subscription you want to tag, which starts with `sub_`. You can get this from the beehiiv dashboard or from previous API calls.

### Tags
- **Tags**: Enter a comma-separated list of tags you want to add to the subscription. For example: `Premium, Active, Engaged`

If a tag doesn't exist in your publication yet, it will be automatically created.

### Output
- **Output Variable**: The name of the variable where the updated subscription information will be stored. This will contain the complete subscription object including all tags.

## Notes
- You can add up to 100 unique tags per publication.
- Tags are case-sensitive.
- This action will add new tags without removing existing ones.

## Example Response
The output variable will contain data similar to:
```json
{
  "id": "sub_00000000-0000-0000-0000-000000000000",
  "email": "example@example.com",
  "status": "active",
  "created": 1666800076,
  "subscription_tier": "free",
  "subscription_premium_tier_names": ["Premium"],
  "tags": ["Premium", "Active", "Engaged"]
}
```