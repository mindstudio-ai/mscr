# Retrieve Background Image from Typeform

This connector allows you to retrieve a background image from Typeform by its ID and size. You can choose to get either the image metadata as JSON or the actual binary image data.

## Configuration

### Image ID
Enter the unique identifier of the image you want to retrieve. You can find this ID in the Typeform API or in the URL when viewing the image in Typeform.

Example: `abc123`

### Image Size
Select the desired size of the image:
- **Default**: Scaled to fit within 1680px × 1050px
- **Tablet**: Scaled to fit within 1024px × 768px
- **Mobile**: Scaled to fit within 460px × 320px
- **Thumbnail**: Scaled to fit within 80px × 50px

### Response Format
Choose how you want to receive the image:
- **JSON Metadata**: Returns information about the image (dimensions, file type, etc.)
- **Binary Image**: Returns the actual image file that can be displayed or downloaded

### Output Variable
Enter a name for the variable that will store the result. You can reference this variable in subsequent steps of your workflow.

## Example Use Cases

- Retrieve image metadata to check dimensions before using it in a form
- Get a binary image to display in your application
- Download thumbnails of images for a gallery view

## Notes

- This connector requires authentication with your Typeform account
- If the image doesn't exist, you'll receive an error message