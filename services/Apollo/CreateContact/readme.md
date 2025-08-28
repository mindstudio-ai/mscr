# Create Contact in Apollo

This action creates a new contact in your Apollo database.

## Basic Configuration

- **First Name**: Enter the contact's first name (required)
- **Last Name**: Enter the contact's last name (required)
- **Email**: The contact's email address
- **Job Title**: The contact's current job position
- **Organization Name**: The company or organization where the contact works

## Contact Details

Additional information about the contact:

- **Website URL**: The corporate website URL (include the full URL with https://)
- **Location**: The contact's location (e.g., "San Francisco, CA, United States")
- **Direct Phone**: Primary phone number
- **Mobile Phone**: Mobile/cell phone number
- **Corporate Phone**: Work/office phone number

## Organization & Labels

- **Account ID**: The Apollo ID for the account to assign this contact to
- **Labels**: A comma-separated list of labels to add the contact to (e.g., "Leads, Conference Contacts")
  - If a label doesn't exist in your Apollo account, it will be created automatically

## Output

- **Output Variable**: Name of the variable that will store the created contact's details

## Important Notes

- Apollo does not apply deduplication when creating contacts via API. If your entry has the same name, email, or other details as an existing contact, a new contact will be created.
- To update an existing contact, use the "Update Contact" action instead.