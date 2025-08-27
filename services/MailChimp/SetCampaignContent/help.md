# Set Campaign Content

This action allows you to update the content of an existing MailChimp campaign.

## Prerequisites

- You need a MailChimp account with an API key
- You need an existing campaign in your MailChimp account

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique ID of the campaign you want to update. You can find this in the URL when viewing your campaign in MailChimp or via the MailChimp API.

### Content Settings

- **Content Source**: Choose how you want to provide the content:
  - **Direct Input**: Enter HTML and/or plain text directly in the fields below
  - **URL Import**: Provide a URL where your HTML content is hosted

- **HTML Content**: Enter the raw HTML for your campaign. This field supports HTML tags and MailChimp merge tags like `*|FNAME|*`.
  
  Example:
  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <title>*|MC:SUBJECT|*</title>
  </head>
  <body>
    <h1>Hello *|FNAME|*!</h1>
    <p>Welcome to our newsletter.</p>
  </body>
  </html>
  ```

- **Plain Text Content**: Enter the plain text version of your email. If you leave this blank but provide HTML, MailChimp will automatically generate plain text from your HTML.

- **URL**: If you selected "URL Import" as your content source, enter the full URL where your HTML content is hosted.

### Output

- **Output Variable**: Enter a name for the variable that will store the API response. This will contain details about the updated campaign content.

## Notes

- At least one of HTML Content or Plain Text Content must be provided if using Direct Input.
- If using URL Import, the URL must be publicly accessible.
- The campaign must exist and be in a draft or paused state to update its content.