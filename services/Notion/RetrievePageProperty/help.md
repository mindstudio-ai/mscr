# Notion - Retrieve Page Property

This connector allows you to retrieve a specific property from a Notion page. It can handle both simple properties (like text, numbers, checkboxes) and paginated properties (like titles, rich text, relations, and people).

## Configuration

### Page Information

- **Page ID or URL**: Enter either the Notion page ID (a UUID like `b55c9c91-384d-452b-81db-d1ef79372b75`) or the full Notion page URL (like `https://www.notion.so/myworkspace/My-Page-b55c9c91384d452b81dbd1ef79372b75`).

- **Property ID**: The ID of the property you want to retrieve. You can find this in the database schema or by using the Retrieve a database endpoint. Property IDs are typically short strings like `aBcD123` or `title`.

### Pagination Options

For properties that might contain multiple values (like relations or rich text):

- **Page Size**: Maximum number of property items to return per page. Default is 100.
- **Start Cursor**: For paginated results, you can provide a cursor to start from. Leave empty for the first page.

### Output

- **Output Variable**: The name of the variable where the property data will be stored.

## Response Format

The response will contain the property value or a list of property values, depending on the property type:

- For simple properties (text, number, checkbox, etc.), you'll get a single property item object.
- For paginated properties (title, rich_text, relation, people), you'll get a list of property item objects.

The response will include pagination information if applicable (`has_more`, `next_cursor`).

## Example Usage

1. Retrieve a simple text property from a Notion page
2. Retrieve all related pages from a relation property
3. Get all people assigned to a task in a Notion database

## Permissions

This connector requires your Notion integration to have `read content` capabilities for the pages you're accessing.