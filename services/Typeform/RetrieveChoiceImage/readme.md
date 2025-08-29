# Typeform: Retrieve Choice Image

This connector allows you to retrieve a choice image from Typeform by its ID and specified size. You can choose to receive either the image metadata as JSON or the binary image data itself.

## Configuration

### Image ID
Enter the unique identifier of the image you want to retrieve. This ID is provided by Typeform when you upload an image or can be found in the image URL.

Example: `abc123`

### Image Size
Select the size format for the retrieved image:

- **Default**: Scaled to fit within 230px × 230px
- **Thumbnail**: Cropped to 80px × 80px
- **Supersize**: Cropped to 310px × 233px
- **Supermobile**: Cropped to 238px × 164px
- **Supersizefit**: Scaled to fit within 310px × 233px
- **Supermobilefit**: Scaled to fit within 238px × 164px

### Response Format
Choose how you want to receive the image:

- **JSON Metadata**: Returns information about the image (ID, URL, dimensions, file type, etc.)
- **Binary Image**: Returns the actual image file that can be displayed or downloaded

### Output Variable
Specify a name for the variable that will store the result. This variable will contain:
- If JSON format: An object with image metadata
- If Binary format: A URL to the uploaded image file

## Example Use Cases

- Retrieve image metadata to display image dimensions in your application
- Get a specific size of an image to display in your interface
- Download image files for further processing or storage

## Authentication

This connector uses your Typeform OAuth token which should be configured at the service level.