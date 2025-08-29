# Retrieve Theme

This connector retrieves detailed information about a specific theme from your Typeform account.

## What You'll Need

- A Typeform account with at least one theme
- The Theme ID of the theme you want to retrieve

## How to Find Your Theme ID

1. Log in to your Typeform account
2. Go to the Themes section
3. Select a theme
4. The Theme ID is in the URL: `https://admin.typeform.com/themes/{theme_id}`

## Configuration

### Theme Information

- **Theme ID**: Enter the unique identifier for the theme you want to retrieve (e.g., `456`)

### Output

- **Output Variable**: Enter a name for the variable that will store the theme information (e.g., `themeData`)

## What This Connector Returns

The connector returns a JSON object containing all theme details including:

- Theme ID and name
- Background settings (brightness, layout, image)
- Colors (answer, background, button, question)
- Field settings (alignment, font size)
- Font information
- Button transparency
- Corner rounding
- Screen settings
- Visibility status

## Example Response

```json
{
  "background": {
    "brightness": -0.59,
    "image_id": 987,
    "layout": "fullscreen"
  },
  "colors": {
    "answer": "#800000",
    "background": "#FFFFFF",
    "button": "#808080",
    "question": "#000000"
  },
  "fields": {
    "alignment": "left",
    "font_size": "medium"
  },
  "font": "Arial",
  "has_transparent_button": false,
  "id": 456,
  "name": "My theme",
  "rounded_corners": "small",
  "screens": {
    "alignment": "center",
    "font_size": "small"
  },
  "visibility": "private"
}
```