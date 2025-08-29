# Retrieve Form Translation

This connector retrieves a translation payload for a specific form in a given language from Typeform.

## What This Connector Does

This connector allows you to fetch translation data for a Typeform form in a specific language. The translation includes localized text for form elements such as fields, welcome screens, thank you screens, and system messages.

## When To Use This Connector

Use this connector when you need to:
- Retrieve translation data for a multilingual form
- Access form content in different languages
- Build multilingual applications that integrate with Typeform

## Configuration

### Form Details

1. **Form ID** (Required)
   - Enter the unique identifier for your Typeform form
   - You can find this in your form URL. For example, in `https://mysite.typeform.com/to/u6nXL7`, the form ID is `u6nXL7`

2. **Language** (Required)
   - Select the language code for the translation you want to retrieve
   - The form must have this language available in its translation settings

### Output

1. **Output Variable** (Required)
   - Specify a variable name to store the translation data
   - The output will be a JSON object containing all translated content for the form

## Example Response

The response will include translated content for:
- Form fields
- Welcome screens
- Thank you screens
- System messages

```json
{
  "fields": [...],
  "messages": {
    "label.buttonHint.default": "Click to continue",
    "label.button.submit": "Submit",
    ...
  },
  "welcome_screens": [...],
  "thankyou_screens": [...]
}
```

## Common Issues

- **404 Error**: The form ID doesn't exist or you don't have access to it
- **400 Error**: The requested language is not available for this form
- **Authentication Error**: Your Typeform integration needs proper authorization

## Requirements

- A Typeform account with access to the form
- The form must have translations configured for the requested language