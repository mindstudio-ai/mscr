# Upload Asset to Canva

This connector allows you to upload images and videos to your Canva content library.

## Prerequisites

- A Canva Developer account with API access
- A valid Canva API token configured in your MindStudio environment variables

## Supported File Types

- **Images**: JPG, PNG, SVG, GIF, WEBP
- **Videos**: MP4, MOV, WEBM

## Configuration

### Asset Name
Enter a name for your asset as it will appear in your Canva library. This name has a maximum length of 50 characters.

### File Path
Provide either:
- A local file path (e.g., `/path/to/image.jpg`)
- A URL to a publicly accessible file (e.g., `https://example.com/image.jpg`)

### Output Variable
Specify a variable name to store the uploaded asset information. This will contain details like:
- Asset ID
- Thumbnail URL
- Creation timestamp
- Other metadata

## Example Usage

1. Upload a local image:
   - **Asset Name**: `Company Logo`
   - **File Path**: `/uploads/logo.png`
   - **Output Variable**: `canvaAsset`

2. Upload from a URL:
   - **Asset Name**: `Product Photo`
   - **File Path**: `https://mywebsite.com/products/photo1.jpg`
   - **Output Variable**: `productAsset`

## Notes

- Large files may take longer to upload and process
- The connector handles the asynchronous nature of Canva's upload process
- If an upload fails, check the error message for details on why it failed