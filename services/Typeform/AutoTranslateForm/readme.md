# Auto-Translate Form

This connector automatically translates a Typeform form to a specified language using the Typeform API.

## Prerequisites

- You need to have a Typeform account with API access
- You need to have connected your Typeform account to MindStudio
- You need to have an existing form in your Typeform account

## Configuration

### Form Details

- **Form ID**: Enter the unique identifier for your Typeform form. You can find this in your form URL.
  - Example: If your form URL is `https://mysite.typeform.com/to/u6nXL7`, the Form ID is `u6nXL7`

- **Target Language**: Select the language you want to translate your form into from the dropdown menu.
  - Available languages include Arabic, Catalan, Czech, Danish, German, Greek, English, Spanish, and many more.

### Output Configuration

- **Output Variable**: Enter a name for the variable that will store the translation result. This variable will contain the complete translation data as a JSON object.
  - Example: `translatedForm`

## How It Works

When you run this connector:

1. It sends a request to the Typeform API to auto-translate your specified form
2. Typeform's system automatically translates all form content to the target language
3. The complete translation data is returned and stored in your specified output variable

## Troubleshooting

- If you receive a 404 error, check that your Form ID is correct
- Make sure your Typeform account has the necessary permissions to use the translation feature
- Some languages may have better translation quality than others

## Output Example

The output variable will contain a JSON object with the translated form content, including fields, welcome screens, thank you screens, and messages.