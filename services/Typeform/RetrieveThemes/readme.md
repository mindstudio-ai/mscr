# Retrieve Themes - Typeform

This connector retrieves a list of all themes (public and private) from your Typeform account. Themes are listed in reverse-chronological order based on the date you added them to your account.

## Configuration

### Query Parameters

- **Page Number**: The page of results to retrieve. Default is 1 (first page of results).
- **Results Per Page**: Number of results to retrieve per page. Default is 10. Maximum is 200.
- **Output Variable**: The variable name where the retrieved themes data will be stored.

## Output

The connector returns a JSON object containing:

- `page_count`: Number of pages
- `total_items`: Total number of items in the retrieved collection
- `items`: Array of theme objects with details like:
  - `id`: Unique ID of the theme
  - `name`: Name of the theme
  - `visibility`: Whether the theme is public or private
  - `background`: Settings for the background
  - `colors`: Colors for answers, background, buttons, and questions
  - And more theme properties

## Example Output

```json
{
  "page_count": 2,
  "total_items": 15,
  "items": [
    {
      "id": "abc123",
      "name": "My Custom Theme",
      "visibility": "private",
      "background": {
        "brightness": 0.5,
        "href": "https://example.com/image.jpg",
        "layout": "fullscreen"
      },
      "colors": {
        "answer": "#000000",
        "background": "#ffffff",
        "button": "#0000ff",
        "question": "#333333"
      },
      "font": "Source Sans Pro",
      "has_transparent_button": false,
      "rounded_corners": "small"
    },
    // More themes...
  ]
}
```

## Use Cases

- Retrieve all themes to display in a dropdown for users to select
- Check if a specific theme exists before creating a new form
- Analyze theme usage across your Typeform account