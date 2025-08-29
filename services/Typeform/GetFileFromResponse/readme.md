# Get File from Response

This connector allows you to retrieve a file that was uploaded by a respondent to your Typeform form. You can use this to access files submitted through file upload fields in your forms.

## How to use this connector

1. **Form ID**: Enter the unique ID for your Typeform form. You can find this in your form URL. For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form ID is `u6nXL7`.

2. **Response ID**: Enter the unique ID for the specific response that contains the file you want to retrieve. You can get this ID from the Typeform Responses API or from a webhook payload.

3. **Field ID**: Enter the unique ID for the file upload field in your form. This is the field where the respondent uploaded the file.

4. **Filename**: Enter the exact name of the file that was uploaded by the respondent.

5. **Display Inline**: Choose whether you want the file to be displayed inline or as an attachment. This affects how browsers handle the file when it's opened directly.

6. **Output Variable**: Enter a name for the variable that will store the URL to the downloaded file. You can use this variable in subsequent steps of your workflow.

## Example

If you have a form with ID `abc123` and you want to retrieve a file named `resume.pdf` that was uploaded to field `fileField` in response `resp456`, you would configure the connector like this:

- Form ID: `abc123`
- Response ID: `resp456`
- Field ID: `fileField`
- Filename: `resume.pdf`
- Display Inline: No
- Output Variable: `uploadedFile`

After running, the variable `uploadedFile` will contain a URL to the downloaded file.

## Notes

- You must have the necessary permissions to access the form and its responses.
- The file must exist in the specified response.
- This connector requires authentication with your Typeform account.