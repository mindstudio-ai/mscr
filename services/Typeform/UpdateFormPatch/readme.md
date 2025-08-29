# Update Typeform Form

This connector allows you to update specific parts of an existing Typeform form using the PATCH method.

## How to use this connector

### Form Information
1. **Form ID** - Enter the unique ID for your form. You can find this in your form URL.
   - Example: For the URL `https://mysite.typeform.com/to/u6nXL7`, the form ID is `u6nXL7`

### Update Operations
You can update any of the following form properties (all are optional):

1. **Title** - Set a new title for your form
   - Example: `Customer Feedback Survey`

2. **Public Status** - Choose whether the form should be public or private
   - Public: Accessible to anyone with the link
   - Private: Only accessible to you and those you share it with

3. **Meta Description** - Update the SEO description for your form
   - Example: `A short survey to gather customer feedback about our services`

4. **Meta Title** - Update the SEO title for your form
   - Example: `Customer Feedback | YourCompany`

5. **Allow Indexing** - Choose whether search engines can index your form
   - Yes: Search engines can index the form
   - No: Search engines will be asked not to index the form

6. **Workspace ID** - Move the form to a different workspace by specifying the workspace ID
   - Example: `123456`

7. **Theme ID** - Apply a different theme to your form by specifying the theme ID
   - Example: `abc123`

### Response
The connector will return a success object with information about whether the update was successful.

## Notes
- You need to provide at least one field to update
- The connector uses your Typeform authentication that's already set up in MindStudio
- Updates are immediate and will be reflected in your Typeform dashboard