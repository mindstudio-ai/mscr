# Retrieve Translation Payload

This connector retrieves the form content in the main language from Typeform, as if it were a translation. This is useful for using it as a base to translate different languages.

## Prerequisites

- A Typeform account with forms created
- Access to the Typeform API through MindStudio (OAuth connection already set up)

## Configuration

### Form Information

- **Form ID**: Enter the unique identifier for your Typeform form. 
  - This can be found in your form URL. For example, in the URL `https://mysite.typeform.com/to/u6nXL7`, the form ID is `u6nXL7`.
  - You can also find your form ID in the Typeform dashboard under the form settings.

### Output

- **Output Variable**: Enter a name for the variable that will store the translation payload data.
  - This variable will contain the complete form content in the main language, including all fields, messages, welcome screens, and thank you screens.

## What You'll Get

The connector will return a JSON object containing:

- **fields**: Array of form fields with their properties, labels, and content
- **messages**: All form messages and button texts
- **thankyou_screens**: Content of all thank you screens
- **welcome_screens**: Content of all welcome screens

## Use Cases

- Use as a base to create translations of your form into different languages
- Extract form content for analysis or documentation
- Back up form content before making significant changes

## Troubleshooting

- If you receive a 404 error, double-check that the Form ID is correct
- Ensure your Typeform account has proper permissions to access the API