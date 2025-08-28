# Update Interest Category

This connector allows you to update an existing interest category in a Mailchimp list. Interest categories (also known as "group titles" in the Mailchimp UI) organize interests which are used to group subscribers based on their preferences.

## Required Inputs

### List ID
The unique identifier for your Mailchimp list (also called an "audience"). You can find this in your Mailchimp account by going to Audience → Settings → Audience name and defaults. The List ID appears in the form of a string like `1a2b3c4d5e`.

### Interest Category ID
The unique identifier for the interest category you want to update. You can find this by:
1. Going to your Audience in Mailchimp
2. Click "Manage Audience" → "Signup forms" → "Form builder"
3. Look for the category in the URL when you edit it, or through the API

### Category Name
The name or title of the interest category. This appears on signup forms and is often phrased as a question like "What topics are you interested in?" or "Which services do you need?".

### Display Type
How this category's interests will appear on signup forms:
- **Checkboxes**: Allow subscribers to select multiple interests
- **Dropdown**: Allow subscribers to select a single interest from a dropdown menu
- **Radio Buttons**: Allow subscribers to select a single interest with radio buttons
- **Hidden**: Hide this category from subscribers (useful for internal segmentation)

## Optional Inputs

### Display Order
A number that determines the order that categories are displayed in the list. Lower numbers display first.

## Output

The connector returns the complete updated interest category object from Mailchimp, including all fields and metadata.
