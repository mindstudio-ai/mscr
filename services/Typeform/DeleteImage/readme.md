# Delete Image - Typeform

This connector allows you to delete an image from your Typeform account.

## Prerequisites

- A Typeform account with API access
- The unique ID of the image you want to delete

## Configuration

### Image Configuration

- **Image ID**: Enter the unique identifier of the image you want to delete from your Typeform account. This ID is typically provided when you upload an image or can be retrieved from the Typeform API.

### Output Configuration

- **Success Message Variable**: Enter a name for the variable that will store the success message after the image is deleted.

## How It Works

When executed, this connector will:
1. Connect to the Typeform API using your authenticated account
2. Delete the specified image using the provided image ID
3. Store a success message in your specified output variable

## Response

If successful, the connector will return a success message indicating the image was deleted.

## Error Handling

The connector will throw an error if:
- The image ID doesn't exist
- You don't have permission to delete the image
- There's an issue with your Typeform authentication
- The Typeform API is experiencing issues