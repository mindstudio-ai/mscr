# Retrieve Image by Size

This connector allows you to retrieve an image from Typeform by its ID and specified size. You can choose to get either the image metadata in JSON format or the actual binary image file.

## Configuration

### Image ID
Enter the unique identifier of the image you want to retrieve. This ID can be found in the Typeform API when working with images.

### Image Size
Select the desired size for the image:
- **Default**: Scaled to a width of 800px
- **Mobile**: Scaled to a width of 460px
- **Thumbnail**: Scaled so that the smallest image side equals the largest of either 80px wide or 50px in height, and then cropped

### Response Format
Choose how you want the image to be returned:
- **JSON Metadata**: Returns information about the image (dimensions, file type, etc.) in JSON format
- **Binary Image**: Returns the actual image file that can be used in your workflow

### Output Variable
Specify the name of the variable that will store the result:
- If you selected JSON Metadata, this variable will contain the image information
- If you selected Binary Image, this variable will contain a URL to the uploaded image file

## Example Response (JSON Metadata)

```json
{
  "id": "abc123",
  "src": "https://api.typeform.com/images/abc123/image/default",
  "file_name": "myimage.jpg",
  "width": 800,
  "height": 600,
  "media_type": "image/jpeg",
  "has_alpha": false,
  "avg_color": "ff8800"
}
```

## Authentication

This connector uses your Typeform OAuth connection. Make sure you have connected your Typeform account in the Connections section.