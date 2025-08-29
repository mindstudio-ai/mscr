# Update Form Translation for Typeform

This connector allows you to update translations for a Typeform form. You can translate form elements like titles, descriptions, button text, and system messages to different languages.

## Configuration

### Form Details

- **Form ID**: Enter the unique identifier for your form. You can find this in your form URL. For example, in `https://mysite.typeform.com/to/u6nXL7`, the Form ID is `u6nXL7`.

- **Language**: Select the language code for the translation you want to update. This determines which language version of your form will be updated.

### Translation Content

- **Translation JSON**: Enter a JSON object containing the translations for your form elements. This should follow the Typeform translation API structure.

- **Output Variable**: Name of the variable where the result will be stored. On success, it will contain `{ success: true }`.

## Translation JSON Example

Here's a simplified example of what your Translation JSON might look like:

```json
{
  "welcome_screens": [
    {
      "properties": {
        "title": "Welcome to our survey",
        "description": "Thank you for participating",
        "button_text": "Start"
      }
    }
  ],
  "fields": [
    {
      "properties": {
        "description": "Please tell us about yourself",
        "title": "Your Information"
      }
    }
  ],
  "thankyou_screens": [
    {
      "properties": {
        "title": "Thank you!",
        "description": "We appreciate your feedback",
        "button_text": "Close"
      }
    }
  ],
  "messages": {
    "label.button.submit": "Submit",
    "label.button.ok": "OK",
    "label.error.required": "This field is required"
  }
}
```

## Notes

- Only include the elements you want to translate. You don't need to include all form elements.
- The structure should match your form's structure with translated content.
- For complex forms, you may want to first retrieve the current translation using Typeform's API and then modify it.