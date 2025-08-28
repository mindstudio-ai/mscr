# Upload Attachment to Airtable

This connector allows you to upload files as attachments to specific records in your Airtable base.

## How to use this connector

### Step 1: Gather your Airtable information
You'll need the following information from your Airtable account:

- **Base ID**: The ID of your Airtable base, which looks like `appXXXXXXXXXXXXXX`. You can find this in your Airtable API documentation or in the URL when viewing your base.
- **Record ID**: The ID of the specific record where you want to add the attachment, which looks like `recXXXXXXXXXXXXXX`.
- **Attachment Field**: The name or ID of the field that accepts attachments in your table. This can be either the field name (e.g., "Attachments") or the field ID (e.g., `fldXXXXXXXXXXXXXX`).

### Step 2: Prepare your file
You need to provide:

- **File Content**: The file content as a base64 encoded string. You can either:
  - Use a variable containing the file data from a previous step
  - Directly paste a base64 encoded string
- **File Name**: The name you want the file to have when uploaded (e.g., "document.pdf", "image.jpg")
- **Content Type**: The MIME type of your file (e.g., "application/pdf", "image/jpeg", "text/plain")

### Step 3: Set an output variable
Choose a name for the variable that will store the response from Airtable, which will include details about the uploaded attachment.

## Limitations

- Maximum file size: 5MB
- For larger files, you'll need to use a different method (uploading via URL)

## Example

If you have a PDF file that you've converted to base64 in a previous step and stored in a variable called `pdfData`, you would configure:

- **File Content**: `{{pdfData}}`
- **File Name**: `report.pdf`
- **Content Type**: `application/pdf`

The response will include the attachment URL and other details that you can use in subsequent steps.