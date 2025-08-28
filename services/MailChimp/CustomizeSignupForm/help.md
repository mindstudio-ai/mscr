# Customize MailChimp Signup Form

This action allows you to customize a MailChimp list's default signup form, including header elements, content messages, and styling.

## Required Information

- **List ID**: The unique identifier for your MailChimp list. You can find this in your MailChimp account under Audience > Audience name > Settings > Audience name and defaults.

## Header Customization

You can customize the header of your signup form with:

- **Header Text**: Text to display in the form header
- **Header Image URL**: A full URL to an image to display in the header
- **Image Alignment**: How to align the header image (None, Left, Center, or Right)

## Content Customization

Customize the messages displayed on your form:

- **Signup Message**: The message shown on the signup form
- **Unsubscribe Message**: The message shown on the unsubscribe form
- **Thank You Title**: The title displayed after someone successfully signs up

## Output

The action returns the complete signup form details including the public URL where your form can be accessed. This information will be stored in the variable you specify.

## Example Use Cases

- Create a branded signup form that matches your website design
- Customize messaging to better engage with your audience
- Update existing signup forms with new messaging or imagery

## Notes

- You only need to provide the fields you want to change
- Any fields left blank will retain their current values
- The form URL will be included in the output, which you can share with your audience