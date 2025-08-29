# Delete Form Translation - Typeform

This connector allows you to delete a translation for a specific Typeform form.

## What this connector does

When you have created translations for your Typeform in different languages, this connector lets you delete a specific language translation from a form.

## Prerequisites

- You need to have connected your Typeform account to MindStudio
- You need to know the Form ID of the form that contains the translation you want to delete
- The form must already have a translation in the language you want to delete

## Configuration

### Form Details

- **Form ID**: Enter the unique identifier for your form. You can find this in your form URL. For example, in the URL `https://mysite.typeform.com/to/u6nXL7`, the Form ID is `u6nXL7`.

- **Language Code**: Select the language code of the translation you want to delete from the dropdown menu. This must match one of the languages that your form is already translated into.

### Response

- **Result Variable**: Enter a name for the variable that will store the result of the operation. This variable will contain a success message if the deletion was successful, or error details if the operation failed.

## What happens after deletion?

After you delete a translation, users will no longer be able to view your form in that language. If you've set up language detection in your form's settings, users with browser preferences set to the deleted language will see the form in its default language instead.

## Troubleshooting

- If you receive a 404 error, it means either the form doesn't exist or there is no translation for the specified language.
- If you receive a 400 error, check the error details in the output variable for more information.