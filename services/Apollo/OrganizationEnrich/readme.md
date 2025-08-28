# Organization Enrichment

This connector enriches company data using Apollo's Organization Enrichment API. It provides detailed information about a company based on its domain name.

## What You'll Need
- An Apollo.io account with API access
- Your Apollo API key configured in the connector settings

## Input Fields

### Company Domain
Enter the domain of the company you want to enrich without any prefixes:
- ✅ `apollo.io`
- ✅ `microsoft.com`
- ❌ `www.apollo.io`
- ❌ `https://apollo.io`

## Output

The connector returns comprehensive company information that may include:
- Company name and website
- Social media profiles (LinkedIn, Twitter, Facebook)
- Industry classification
- Employee count estimate
- Annual revenue
- Funding information
- Technologies used
- Company location and contact details

The data will be stored in the variable you specify in the "Output Variable" field.

## Example Use Cases
- Enrich lead data with company information for better sales targeting
- Validate company information before outreach
- Research potential clients or partners
- Build company profiles for market analysis

## Limitations
- Limited to one company domain per request
- Subject to Apollo's API rate limits
- Some fields may be empty depending on Apollo's data availability for the company