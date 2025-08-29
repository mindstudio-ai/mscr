# Typeform Retrieve Image

This connector allows you to retrieve an image from Typeform by its unique ID. You can choose to get either the binary image data (which will be uploaded and returned as a URL) or the JSON metadata about the image.

## Prerequisites

- You must have connected your Typeform account to MindStudio
- You need to know the ID of the image you want to retrieve

## Configuration

### Image ID

Enter the unique identifier of the image you want to retrieve. This is typically a short alphanumeric string (e.g., `XcXx`).

### Response Format

Choose the format you want for the retrieved image:

- **Binary Image**: Returns the actual image file, which will be uploaded and made available as a URL
- **JSON Metadata**: Returns information about the image such as dimensions, file type, and source URL

### Output Variable

Enter a name for the variable that will store the result. This variable can be used in subsequent steps of your workflow.

## Output

Depending on the selected response format, the output will be:

- **Binary Image**: A URL to the uploaded image file
- **JSON Metadata**: A JSON object with the following structure:

```json
{
  "id": "XcXx",
  "src": "https://api.typeform.com/images/{image_id}/background/{size}",
  "file_name": "example.gif",
  "width": 100,
  "height": 100,
  "media_type": "image/gif",
  "has_alpha": true,
  "avg_color": "ff00ff"
}
```

## Common Issues

- If the image ID doesn't exist, you'll receive an error
- Make sure your Typeform account has the necessary permissions to access the image