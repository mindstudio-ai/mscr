# Create Interest Category

This action creates a new interest category in your Mailchimp list. Interest categories organize interests, which are used to group subscribers based on their preferences. These correspond to Group Titles in the Mailchimp application.

## Configuration

### List Information
- **List ID**: Enter the unique ID for your Mailchimp list. You can find this in your Mailchimp account by going to Audience → Settings → Audience name and defaults. The List ID appears in the form of a string like `abc123def`.

### Interest Category Details
- **Category Name**: Enter a name for your interest category. This appears on signup forms and is often phrased as a question, such as "What topics are you interested in?" or "Which services would you like to hear about?".

- **Display Type**: Choose how this category's interests will appear on signup forms:
  - **Checkboxes**: Allows subscribers to select multiple interests
  - **Dropdown**: Provides a dropdown menu for selecting a single interest
  - **Radio Buttons**: Allows selection of a single interest using radio buttons
  - **Hidden**: The category won't be visible on signup forms

- **Display Order** (optional): Enter a number to determine the order in which categories are displayed. Lower numbers display first.

### Output
- **Output Variable**: Enter a name for the variable that will store the created interest category information. This variable will contain details like the category ID, which you can use in subsequent actions.

## Example Use Cases

- Creating topic preferences for a newsletter
- Setting up product interest groups for marketing campaigns
- Organizing event attendance preferences
- Building segmentation options for targeted emails

## Notes

- You need to have a list created in Mailchimp before you can add interest categories.
- After creating an interest category, you'll typically want to add specific interests within that category.
- The Display Type cannot be changed after the interest category is created.