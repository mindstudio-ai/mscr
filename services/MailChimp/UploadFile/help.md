# Upload File to MailChimp

This connector allows you to upload files to your MailChimp File Manager.

## Prerequisites

- A MailChimp account with API access
- Your MailChimp API Key configured in the connector settings
- Your MailChimp Server Prefix configured in the connector settings (e.g., us19)

## Configuration

### File Name
Enter the name you want the file to have in MailChimp's File Manager.

### File Content
Provide the base64-encoded content of the file. You can use other connectors or code blocks to convert your file to base64 format.

Example of how to get base64 content:
- From a URL: Use the "HTTP Request" connector to download the file and then convert it to base64
- From a local file: Use a code block with `Buffer.from(fileContent).toString('base64')`

### Folder ID (Optional)
If you want to upload the file to a specific folder in your File Manager, provide the folder ID. Leave this field empty to upload to the root folder.

To find a folder ID:
1. Go to your MailChimp account
2. Navigate to Content → File Manager
3. Select the desired folder
4. The folder ID can be found in the URL (e.g., `https://us19.admin.mailchimp.com/file-manager/#/gallery/folders/12345`)

### Output Variable
The name of the variable where the response will be stored. The response includes:
- `id`: The unique ID of the file
- `name`: The name of the file
- `full_size_url`: The URL to access the file
- `thumbnail_url`: For images, a URL to a thumbnail version
- `type`: The type of file (image or file)
- `size`: The size of the file in bytes
- And other metadata

## Example Usage

After the file is uploaded, you can use the file URL in your MailChimp campaigns or other integrations.

Example of accessing the file URL in subsequent steps:
```
{{outputs.uploadedFile.full_size_url}}
```

Where `uploadedFile` is the output variable you specified.
