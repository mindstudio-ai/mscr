# Delete Contact

This action permanently removes a contact from your ActiveCampaign account.

## Configuration

### Contact ID
Enter the numeric ID of the contact you want to delete. This is a required field.

Example: `123`

## Important Notes

- This action cannot be undone - once a contact is deleted, it is permanently removed from your ActiveCampaign account.
- You can find a contact's ID in ActiveCampaign by viewing the contact and checking the URL (it will contain something like `/contact/123`).
- If the contact ID doesn't exist, the API will return a 404 error.

## Authentication

This connector requires:
- Your ActiveCampaign API Key
- Your ActiveCampaign Account URL (e.g., https://youraccount.api-us1.com)

These should be configured in your connector settings.