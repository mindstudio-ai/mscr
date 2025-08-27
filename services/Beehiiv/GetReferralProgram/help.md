# Get Referral Program

This connector retrieves details about a publication's referral program from Beehiiv, including milestones and rewards.

## Configuration

### Publication Details
- **Publication ID**: Enter your Beehiiv publication ID, which starts with `pub_` followed by a UUID (e.g., `pub_00000000-0000-0000-0000-000000000000`). You can find this in your Beehiiv dashboard.

### Pagination Options
- **Results Per Page**: Optional. Specify how many results to return per page (between 1-100). Default is 10.
- **Page Number**: Optional. Specify which page of results to retrieve. Default is 1.

### Output
- **Output Variable**: Enter a name for the variable that will store the referral program details. You can reference this variable in subsequent steps of your workflow.

## Example Response

The connector will return data in this format:

```json
{
  "data": [
    {
      "id": "mile_00000000-0000-0000-0000-000000000000",
      "auto_fulfill": true,
      "num_referrals": 1,
      "reward": {
        "id": "rew_00000000-0000-0000-0000-000000000000",
        "name": "Exclusive Content",
        "description": "Access to premium newsletter content",
        "image_url": "https://example.com/image.jpg",
        "type": "digital"
      }
    }
  ],
  "limit": 10,
  "page": 1,
  "total_results": 1,
  "total_pages": 1
}
```

## Notes
- You need a valid Beehiiv API key configured in your environment settings.
- The response includes all milestones and their associated rewards for your publication's referral program.