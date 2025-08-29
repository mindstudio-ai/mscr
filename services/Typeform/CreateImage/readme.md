# Create Image - Typeform

This connector allows you to upload an image to your Typeform account. You can upload an image either by providing a URL to the image or by providing the image data in base64 format.

## Configuration

### Image Source

1. **Upload Method**: Choose how you want to upload the image:
   - **Image URL**: Upload an image from a URL
   - **Base64 Encoded Image**: Upload an image using base64 encoded data

2. **Image URL**: If you selected "Image URL" as your upload method, enter the URL of the image you want to upload.
   - Example: `https://example.com/images/my-photo.jpg`

3. **Base64 Image**: If you selected "Base64 Encoded Image" as your upload method, paste the base64 encoded image data.
   - Important: Do not include descriptors like `data:image/png;base64,` - only include the actual base64 code.
   - Example: `iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAG0lEQVR42mOccuMbA7mAcVTzqOZRzaOaB1YzABKjL70rq/b4AAAAAElFTkSuQmCC`

### Image Details

4. **File Name**: Enter a name for the image file.
   - Example: `my-image.jpg`

### Output

5. **Output Variable**: Enter a name for the variable that will store the URL of the uploaded image.
   - This URL can be used in other actions in your workflow.

## Notes

- The connector requires that you have a valid Typeform account with appropriate permissions.
- The maximum file size for uploaded images depends on your Typeform plan.
- Supported image formats include: JPG, PNG, and GIF.