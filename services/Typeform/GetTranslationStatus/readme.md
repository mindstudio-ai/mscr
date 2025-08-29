# Get Translation Status

This connector retrieves the translation statuses for a specific Typeform form. It shows which languages have translations and their current status.

## What This Connector Does

- Retrieves the status of translations for each language available for a given Typeform form
- Returns information about which languages are available and their translation status (new, update_required, or translated)

## Prerequisites

- A Typeform account with forms that have translations
- The Typeform integration must be connected to your MindStudio account

## Configuration

### Form Information

- **Form ID**: Enter the unique identifier for your Typeform form
  - This can be found in your form URL
  - For example, in `https://mysite.typeform.com/to/u6nXL7` the form ID is `u6nXL7`

### Output

- **Output Variable**: Name of the variable where the translation status results will be stored

## Output Format

The connector will return an array of language objects with the following structure:

```json
{
  "languages": [
    {
      "code": "en",
      "status": "translated"
    },
    {
      "code": "es",
      "status": "new"
    },
    {
      "code": "fr",
      "status": "update_required"
    }
  ]
}
```

Where:
- `code`: The language code (e.g., "en" for English, "es" for Spanish)
- `status`: One of three possible values:
  - `new`: No translation exists yet
  - `update_required`: Translation exists but needs updating
  - `translated`: Translation is complete and up to date

## Common Issues

- **404 Error**: Check that your Form ID is correct
- **Authentication Error**: Ensure your Typeform integration is properly connected