# Get Campaign EepURL Activity

This connector retrieves social activity for a Mailchimp campaign tracked by EepURL, including Twitter activity, click statistics, and referrer information.

## Prerequisites

- You need a Mailchimp account with API access
- You need to have created at least one campaign in Mailchimp
- You need your Mailchimp API key and server prefix configured in the connector settings

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique identifier for the campaign you want to get EepURL data for. This can be found in the URL when viewing a campaign in Mailchimp or via the Mailchimp API.

### Response Options (Optional)

- **Fields**: Optionally specify which fields you want to include in the response as a comma-separated list. 
  Example: `twitter,clicks,referrers,eepurl`

- **Exclude Fields**: Optionally specify which fields you want to exclude from the response as a comma-separated list.
  Example: `_links,twitter.statuses`

### Output

- **Output Variable**: Name of the variable that will store the EepURL activity data.

## Example Response

The output will contain data similar to this:

```json
{
  "twitter": {
    "tweets": 5,
    "first_tweet": "2023-01-15T12:30:45Z",
    "last_tweet": "2023-01-20T08:15:22Z",
    "retweets": 2,
    "statuses": [...]
  },
  "clicks": {
    "clicks": 250,
    "first_click": "2023-01-15T10:20:30Z",
    "last_click": "2023-01-22T14:45:12Z",
    "locations": [...]
  },
  "referrers": [...],
  "eepurl": "https://eepurl.com/abcdef",
  "campaign_id": "abc123def456"
}
```

## Troubleshooting

- If you receive a 404 error, verify that the Campaign ID is correct
- If you receive a 401 error, check that your API key and server prefix are correct
- Make sure the campaign has been sent, as EepURL data is only available for campaigns that have been delivered