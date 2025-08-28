# Add Leads to HeyReach Campaign

This connector allows you to add leads to your HeyReach campaigns. You can add detailed information about each lead including their LinkedIn profile, contact details, and custom fields.

## Configuration

### Campaign Configuration
- **Campaign ID**: Enter the numeric ID of the campaign where you want to add leads. You can find this in your HeyReach dashboard.

### Lead Information
- **First Name**: The lead's first name.
- **Last Name**: The lead's last name.
- **LinkedIn Profile URL**: The full URL to the lead's LinkedIn profile (e.g., `https://www.linkedin.com/in/johndoe`).
- **Email Address** (optional): The lead's email address.
- **Company Name** (optional): The company where the lead works.
- **Position/Title** (optional): The lead's job title or position.
- **Location** (optional): The lead's geographical location.
- **Summary** (optional): A brief professional summary about the lead.
- **About** (optional): More detailed information about the lead.

### LinkedIn Account (Optional)
- **LinkedIn Account ID**: If you want to map this lead to a specific LinkedIn account in your campaign, enter the numeric ID of that account.

### Custom Fields (Optional)
- **Custom Fields (JSON)**: You can add custom fields for the lead in JSON format. Field names must contain only alphanumeric characters or underscores.

Example:
```json
[
  {
    "name": "favorite_color",
    "value": "blue"
  },
  {
    "name": "industry_experience",
    "value": "5 years"
  }
]
```

### Response
- **Output Variable**: Name of the variable where the response will be stored. The response includes counts of leads added, updated, and failed.

## Response Format

The connector will return a response in this format:

```json
{
  "addedLeadsCount": 1,
  "updatedLeadsCount": 0,
  "failedLeadsCount": 0
}
```

## Notes

- You can add up to 100 leads per request.
- If a lead with the same profile URL already exists in the campaign, it will be updated.
- Custom field names must contain only alphanumeric characters or underscores.