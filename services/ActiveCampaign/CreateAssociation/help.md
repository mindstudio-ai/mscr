# Create Association

This connector creates an association between a contact and an account in ActiveCampaign.

## Configuration

### Contact ID
Enter the ID of the existing contact you want to associate with an account. This is a required numeric value that can be found in your ActiveCampaign dashboard.

Example: `123`

### Account ID
Enter the ID of the existing account you want to associate with the contact. This is a required numeric value that can be found in your ActiveCampaign dashboard.

Example: `456`

### Job Title
Optionally specify the job title of the contact at this account. This helps provide context about the contact's role within the organization.

Example: `Product Manager`

### Output Variable
Specify a variable name to store the response data from ActiveCampaign. This will contain details about the created association, including its unique ID.

## Notes

- ActiveCampaign currently allows only one account per contact.
- Both the contact and account must already exist in your ActiveCampaign system.
- The API response will include the association ID, timestamps, and links to the related resources.
