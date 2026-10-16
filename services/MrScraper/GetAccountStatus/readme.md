# Get Account Status - MrScraper

This connector retrieves the status of the MrScraper account that owns your API key: subscription status, token usage, remaining tokens and rate limits.

## What You'll Need

- A MrScraper API key, configured in the MrScraper service settings. You can create one at [app.mrscraper.com/api-tokens](https://app.mrscraper.com/api-tokens).

## Configuration

### Output Variable

Stores an object like this:

```json
{
  "subscriptionStatus": "active",
  "enterprise": false,
  "tokenUsage": 250,
  "tokenLimit": 1000,
  "tokenRemaining": 750,
  "usagePercent": 25,
  "rateLimit": 60,
  "rateTtl": 60,
  "autoRenew": true,
  "endsAt": "2026-12-01T00:00:00.000Z",
  "user": {
    "name": "Your Name",
    "email": "you@example.com",
    "verified": true
  }
}
```

API keys and billing identifiers are never included in the output.

## Usage Tips

- Check `tokenRemaining` before a large batch of Fetch Page or Web Search steps, and stop or notify someone when it is low.
- Use it as a quick test that your MrScraper connection is set up correctly.

## Troubleshooting

- **Authentication failed**: Check the API key in the MrScraper service settings.
