# View Account

This connector retrieves detailed information about an account (company) from Apollo.io.

## Prerequisites

- You need a master API key from Apollo.io. Regular API keys won't work for this endpoint.
- You must have the account ID of the company you want to retrieve information about.

## Configuration

### Account Information

- **Account ID**: Enter the Apollo ID for the account you want to retrieve. This is a unique identifier for the account in Apollo's database.
  - Example: `6518c6184f20350001a0b9c0`
  - You can find account IDs by using Apollo's "Search for Accounts" endpoint or from the URL when viewing an account in the Apollo web interface.

### Output

- **Output Variable**: Enter a name for the variable that will store the account information. This variable will contain all the details about the account, such as name, website URL, industry, employee count, and more.

## Output Example

The connector will return a JSON object containing detailed account information:

```json
{
  "id": "6518c6184f20350001a0b9c0",
  "name": "Apollo.io",
  "website_url": "http://www.apollo.io",
  "linkedin_url": "http://www.linkedin.com/company/apolloio",
  "twitter_url": "https://twitter.com/MeetApollo/",
  "facebook_url": "https://facebook.com/MeetApollo/",
  "alexa_ranking": 3514,
  "linkedin_uid": "18511550",
  "founded_year": 2015,
  "logo_url": "https://example.com/logo.png",
  "primary_domain": "apollo.io",
  "industry": "information technology & services",
  "estimated_num_employees": 910,
  "keywords": [
    "sales engagement",
    "lead generation",
    "predictive analytics"
  ]
}
```

## Common Issues

- **403 Forbidden**: This usually means you're not using a master API key. Make sure you've created and are using a master API key.
- **422 Unprocessable Entity**: This typically indicates an invalid account ID. Double-check the account ID you've entered.