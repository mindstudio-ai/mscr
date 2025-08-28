# Create a Notion Database

This action creates a new database in your Notion workspace as a subpage of an existing page.

## Configuration

### Parent Page ID
Enter the ID of the Notion page where you want to create the database. You can use either:
- The full Notion URL: `https://www.notion.so/myworkspace/98ad959b2b6a477480ee00246fb0ea9b`
- Just the ID: `98ad959b-2b6a-4774-80ee-00246fb0ea9b`

To find a page ID, open the page in Notion, click the "Share" button, and copy the URL.

### Database Title
Enter the name for your new database as it will appear in Notion.

### Properties Definition
Define the columns (properties) of your database using JSON format. Each property needs a name and a type with optional configuration.

**Example:**
```json
{
  "Name": {
    "title": {}
  },
  "Price": {
    "number": {
      "format": "dollar"
    }
  },
  "In Stock": {
    "checkbox": {}
  },
  "Category": {
    "select": {
      "options": [
        { "name": "Produce", "color": "green" },
        { "name": "Dairy", "color": "blue" },
        { "name": "Meat", "color": "red" }
      ]
    }
  },
  "Date Added": {
    "date": {}
  }
}
```

**Common property types:**
- `title`: The primary property (required)
- `rich_text`: Multi-line text
- `number`: Numeric values (with optional format)
- `select`: Single select from options
- `multi_select`: Multiple selections from options
- `date`: Date and time
- `checkbox`: True/false values
- `url`: Web links
- `email`: Email addresses
- `phone_number`: Phone numbers
- `formula`: Computed values
- `relation`: Links to other databases
- `files`: Attached files and images

### Icon (Optional)
Enter a single emoji to use as the database icon (e.g., 📝, 🗂️, 📊).

### Cover Image URL (Optional)
Enter a URL to an image to use as the database cover.

## Output
The action will return information about the newly created database, including its ID, URL, and other details.