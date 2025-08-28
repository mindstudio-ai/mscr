# Update Contact in Apollo.io

This connector allows you to update an existing contact in your Apollo.io account.

## Prerequisites

- You need an Apollo.io account with API access
- You need your Apollo API key configured in the connector settings
- You need the Contact ID of the contact you want to update

## Configuration

### Contact Information

- **Contact ID**: The unique Apollo ID for the contact you want to update. This is required and looks like `66e34b81740c50074e3d1bd4`.
- **First Name**: The updated first name for the contact.
- **Last Name**: The updated last name for the contact.
- **Email**: The updated email address for the contact.
- **Job Title**: The updated job title for the contact (e.g., "Senior Marketing Manager").

### Company Information

- **Organization Name**: The updated company name where the contact works.
- **Website URL**: The updated corporate website URL. Include the full URL with protocol (e.g., `https://www.apollo.io/`).
- **Account ID**: The Apollo ID of the account to assign this contact to (e.g., `63f53afe4ceeca00016bdd2f`).

### Contact Details

- **Contact Stage ID**: The ID of the contact stage to assign (e.g., `6095a710bd01d100a506d4af`). You can get this from the List Contact Stages endpoint.
- **Location**: The contact's location in a human-readable format (e.g., "San Francisco, United States" or "London, UK").
- **Labels**: A comma-separated list of labels to assign to the contact (e.g., "inbound lead, conference attendee, 2024 prospect").

### Phone Numbers

- **Direct Phone**: The primary phone number for the contact.
- **Corporate Phone**: The work/office phone number for the contact.
- **Mobile Phone**: The mobile phone number for the contact.

### Output

- **Output Variable**: The name of the variable that will store the updated contact information returned by Apollo.

## Notes

- You only need to include the fields you want to update. Leave other fields blank.
- The Contact ID is required to identify which contact to update.
- Phone numbers can be entered in any format as Apollo will sanitize them.