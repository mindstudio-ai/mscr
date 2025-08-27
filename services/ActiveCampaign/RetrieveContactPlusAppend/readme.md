# Retrieve Contact Plus Append

This action retrieves additional social media and profile information for a contact in ActiveCampaign.

## Configuration

### Contact ID
Enter the numeric ID of the contact you want to retrieve additional information for. You can find a contact's ID in your ActiveCampaign account by viewing the contact and looking at the URL (it will contain something like `/contact/view/123` where 123 is the contact ID).

Example: `123`

### Output Variable
Enter a name for the variable that will store the retrieved contact information. You can reference this variable in subsequent steps of your workflow.

## What this action returns

This action returns a data object containing social media profiles and other additional information about the contact, including:

- Profile image URL
- Twitter profile link
- Facebook profile link
- LinkedIn profile link
- Last updated timestamps for various data sources

Example output:
```json
{
  "plusAppend": {
    "contact": "123",
    "imageUrl": "https://img.fullcontact.com/static/abc123...",
    "membershipsFacebook": "https://facebook.com/username",
    "membershipsTwitter": "https://twitter.com/username",
    "membershipsLinkedin": "https://linkedin.com/in/username",
    "id": "456"
  }
}
```

## Troubleshooting

- If you receive a 404 error, verify that the contact ID exists in your ActiveCampaign account.
- Ensure your API Key and Account URL are correctly configured in the service settings.