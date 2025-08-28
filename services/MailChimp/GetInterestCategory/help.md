# Get Interest Category

This action retrieves detailed information about a specific interest category from your MailChimp list.

## What are Interest Categories?

Interest categories (also known as "groups" in the MailChimp interface) organize interests, which are used to group subscribers based on their preferences. These appear as Group Titles in the MailChimp application.

## Required Information

### List ID
Enter the unique identifier for your MailChimp list. You can find this in your MailChimp account by:
1. Going to Audience → All Contacts
2. Click on "Settings" → "Audience name and defaults"
3. Scroll down to find "Audience ID"

### Interest Category ID
Enter the unique identifier for the interest category you want to retrieve. To find this:
1. Go to Audience → All Contacts
2. Click on "Manage Audience" → "Signup forms"
3. Select "Form builder"
4. Add or edit a group field
5. The Interest Category ID will be in the URL when editing a group

## Advanced Options

### Fields to Include
Optionally specify which fields you want to include in the response. This is useful to limit the data returned.

Example: `title,type,display_order`

### Fields to Exclude
Optionally specify which fields you want to exclude from the response.

Example: `_links`

## Output

The action will return an object containing information about the interest category, including:
- `list_id`: The unique list ID
- `id`: The interest category ID
- `title`: The name of the category
- `display_order`: The order in which the category appears
- `type`: How the category appears on signup forms (checkboxes, dropdown, radio, or hidden)