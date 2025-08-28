# Apollo People Enrichment

This action enriches person data using Apollo's database. It takes identifying information about a person and returns comprehensive professional details including current position, company information, and contact details.

## How to use this action

### Person Identification
Provide at least one identifier to find the person in Apollo's database. The more information you provide, the more likely Apollo will find a match.

- **Full Name**: The person's complete name (e.g., "John Smith")
- **First Name** and **Last Name**: Can be used instead of Full Name
- **Email Address**: The person's professional email
- **Company Name**: The organization where the person works
- **Company Domain**: The website domain of the company (e.g., "company.com" without "www." or "@")
- **LinkedIn URL**: The person's LinkedIn profile URL

### Enrichment Options

- **Reveal Personal Emails**: Set to "Yes" to include personal email addresses in the results. This consumes additional Apollo credits.
- **Reveal Phone Numbers**: Set to "Yes" to include phone numbers in the results. This consumes additional Apollo credits and requires a webhook URL.
- **Webhook URL**: Required only if "Reveal Phone Numbers" is set to "Yes". Apollo will send phone number data to this URL asynchronously.

### Output

- **Output Variable**: The variable name where the enriched person data will be stored. This will contain details like job title, company information, verified email, and more.

## Important Notes

- You must provide at least one person identifier (name, email, company details, or LinkedIn URL).
- This action consumes Apollo credits as part of your pricing plan.
- Personal emails will not be revealed for people in GDPR-compliant regions.
- Phone number verification is asynchronous and can take several minutes to be delivered to your webhook URL.
- This feature is not accessible to Apollo users on free plans.

## Example Output

```json
{
  "person": {
    "id": "66b8a5d38d90c000011cce51",
    "first_name": "Tim",
    "last_name": "Zheng",
    "name": "Tim Zheng",
    "linkedin_url": "http://www.linkedin.com/in/tim-zheng-677ba010",
    "title": "Founder & CEO",
    "email_status": "verified",
    "photo_url": "https://static.licdn.com/aero-v1/sc/h/9c8pery4andzj6ohjkjp54ma2",
    "headline": "Founder & CEO at Apollo",
    "email": "tim@apollo.io",
    "organization_id": "5e66b6381e05b4008c8331b8",
    "employment_history": [
      {
        "current": true,
        "organization_name": "Apollo",
        "start_date": "2016-01-01",
        "title": "Founder & CEO"
      }
    ]
  }
}
```