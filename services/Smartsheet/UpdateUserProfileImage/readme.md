# Update User Profile Image

Uploads an image to the user profile.

Uploading a profile image differs from Adding an Image to a Cell in the following ways:
  * A **Content-Length** header is not required
  * Allowable file types are limited to: gif, jpg, and png
  * Maximum file size is determined by the following rules:
      * If you have not defined a custom size and the image is larger than
1050 x 1050 pixels, Smartsheet scales the image down to 1050 x 1050
      * If you have defined a custom size, Smartsheet uses that as the file
size max
  * If the image is not square, Smartsheet uses a solid color to pad the image

## Inputs

- **userId** (required): (Required) User Id
- **attachmentsubtype** (optional): Body property
- **attachmenttype** (optional): Body property
- **description** (optional): Body property
- **name** (optional): Body property
- **url** (optional): Body property
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
