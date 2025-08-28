# Upload File to Notion

This connector allows you to upload files to your Notion workspace directly from a URL. The file will be downloaded from the provided URL and then uploaded to Notion.

## Configuration

### File Details

- **File URL**: Enter the URL of the file you want to upload to Notion. This must be a publicly accessible URL.
  - Example: `https://example.com/myfile.pdf`

- **Filename**: Specify the name for the file in Notion. This should include the file extension.
  - Example: `quarterly-report.pdf`

- **Content Type** (optional): The MIME type of the file. If not provided, it will be inferred from the file extension.
  - Example: `application/pdf`, `image/png`, `text/plain`

### Upload Options

- **Upload Mode**: Choose the appropriate upload method based on your file size:
  - **Single Part**: For files under 20MB (recommended for most files)
  - **Multi Part**: For larger files (over 20MB)

- **Output Variable**: Name of the variable that will store the upload result. This will contain details about the uploaded file including its ID, status, and other metadata.

## Notes

- The maximum file size supported is 5MB for single-part uploads and up to 100MB for multi-part uploads.
- Uploaded files will expire after a certain period if not attached to a Notion page.
- This connector requires Notion integration permissions that include file upload capabilities.