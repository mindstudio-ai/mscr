# Update Custom Messages for Typeform

This connector allows you to customize the text messages displayed in your Typeform forms, such as button labels, error messages, and hints.

## How to use this connector

1. **Form Information**
   - **Form ID**: Enter your Typeform form ID. You can find this in your form URL. For example, in the URL `https://mysite.typeform.com/to/u6nXL7`, the form ID is `u6nXL7`.

2. **Custom Messages**
   - **Submit Button Text**: Customize the text shown on the submit button (default: "Submit").
   - **Success Message**: Set the message shown after successful form submission (default: "Thanks for completing this typeform!").
     - You can use formatting like `*bold*` and `_italic_` in this field.
   - **Required Field Error**: Customize the error message shown for required fields (default: "This field is required").

3. **Advanced Options**
   - **Yes Text**: Customize the text representation for "Yes" options (default: "Yes").
   - **No Text**: Customize the text representation for "No" options (default: "No").
   - **Multiple Choice Hint**: Set the hint text shown for multiple choice questions (default: "Select all that apply").

## Character Limits

- Submit Button Text: Maximum 100 characters
- Success Message: Maximum 128 characters
- Required Field Error: Maximum 64 characters
- Multiple Choice Hint: Maximum 45 characters

## Notes

- You only need to fill in the fields you want to customize. Any fields left blank will keep their current values.
- This connector requires a connected Typeform account with appropriate permissions to modify the specified form.
- The changes will be applied immediately to your form.