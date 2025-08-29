# Retrieve Custom Form Messages

This connector retrieves all customizable messages for a Typeform form using the form's specified language.

## What it does

When you run this connector, it will:
1. Connect to the Typeform API using your authenticated account
2. Retrieve all customizable messages for the specified form
3. Store the complete messages object in your specified output variable

## Configuration

### Form Information

- **Form ID**: Enter the unique identifier for your form. 
  - You can find this in your form URL. For example, in the URL `https://mysite.typeform.com/to/u6nXL7`, the form ID is `u6nXL7`.

### Output

- **Output Variable**: Enter a name for the variable that will store the form messages.
  - This variable will contain a JSON object with all customizable messages for your form.

## Example Response

The output variable will contain a JSON object similar to this:

```json
{
  "label.buttonHint.default": "Press Enter",
  "label.buttonNoAnswer.default": "Continue",
  "block.shortText.placeholder": "Type your answer here...",
  "label.button.submit": "Submit",
  "label.warning.success": "Thanks for completing this typeform!",
  // ... many more message properties
}
```

## Common Use Cases

- Retrieve form messages before updating them
- Check existing translations or custom messages
- Export form messages for documentation or translation purposes

## Troubleshooting

- **Form not found**: Verify that the Form ID is correct and that you have access to this form
- **Authentication error**: Ensure your Typeform account is properly connected
- **Empty response**: Some forms may not have custom messages set