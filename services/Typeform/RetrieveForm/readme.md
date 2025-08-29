# Retrieve Form from Typeform

This connector allows you to retrieve detailed information about a Typeform form using its ID.

## What this connector does

When configured correctly, this connector will:
- Fetch all details about a specific Typeform form
- Return comprehensive information including fields, welcome screens, thank you screens, logic jumps, and theme
- Store the complete form data in a variable for use in subsequent steps

## How to find your Form ID

The Form ID is a unique identifier for your Typeform form. You can find it in the URL of your form:

1. Go to your Typeform dashboard
2. Open the form you want to retrieve
3. Look at the URL in your browser: `https://mysite.typeform.com/to/u6nXL7`
4. The Form ID is the part after the last slash (in this example: `u6nXL7`)

## Configuration

### Form Details
- **Form ID**: Enter the unique identifier for your form (required)
  - Example: `u6nXL7`

### Output
- **Output Variable**: Specify a name for the variable that will store the form data (required)
  - Example: `formData`

## Using the retrieved data

The output variable will contain a JSON object with all form details, including:

- Basic form information (title, language)
- All form fields and their properties
- Welcome and thank you screens
- Logic jumps and conditional rules
- Theme and styling information
- Form settings and configuration

You can access specific properties of the form in subsequent steps using dot notation:

- `{{formData.title}}` - The form's title
- `{{formData.fields}}` - Array of all form fields
- `{{formData.settings}}` - Form settings
- `{{formData._links.display}}` - The public URL of the form

## Common use cases

- Create a backup of your form configuration
- Analyze form structure and logic flows
- Duplicate and modify forms programmatically
- Extract specific field configurations for reporting

## Troubleshooting

If you encounter errors:

1. Verify your Form ID is correct
2. Ensure your Typeform connection is properly authenticated
3. Check that you have permission to access the form