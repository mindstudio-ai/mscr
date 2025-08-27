# Get List Signup Forms

This action retrieves all signup forms for a specific MailChimp list.

## Configuration

### List ID
Enter the unique identifier for the MailChimp list you want to retrieve signup forms for. This is a required field.

You can find your List ID by:
1. Logging into your MailChimp account
2. Going to Audience → All Contacts
3. Click on "Settings" in the dropdown menu
4. Click on "Audience name and defaults"
5. The List ID is shown as "Audience ID" in the settings

Example List ID: `1a2b3c4d5e`

### Output Variable
Specify a name for the variable that will store the retrieved signup forms data. This data will include:
- Signup form URLs
- Form content and styles
- Header information
- And other form configuration details

## Response Format

The response will be stored in your specified output variable as a JSON object containing:
- `signup_forms`: Array of form objects
- `list_id`: The ID of the list
- `total_items`: Number of forms found

## Example Use Cases

- Retrieve form URLs to embed in your website
- Get form styling information to match your branding
- Access form content to analyze or modify messaging