# Update Typeform Theme

This connector allows you to update an existing theme in your Typeform account with a complete theme definition. You can customize colors, fonts, styles, and other visual elements of your Typeform themes.

## Prerequisites

- You must have a Typeform account with API access
- You need the ID of an existing theme that you want to update
- Note: You can only update private themes that you've created, not Typeform's public themes

## Configuration

### Theme Configuration

- **Theme ID**: Enter the unique ID of the theme you want to update. You can find this in the URL when editing a theme in Typeform.
- **Theme Name**: Enter a name for your theme.

### Colors

Customize the color scheme of your theme using hexadecimal color values:

- **Answer Color**: The color applied to answers (e.g., `#4FB0AE`)
- **Background Color**: The color applied to the form background (e.g., `#FFFFFF`)
- **Button Color**: The color applied to buttons (e.g., `#4FB0AE`)
- **Question Color**: The color applied to questions (e.g., `#3D3D3D`)

### Font & Style

- **Font**: Select the font family for your theme
- **Rounded Corners**: Choose the border radius style for buttons and other elements
- **Transparent Button**: Select "Yes" to make buttons transparent, or "No" for solid buttons

### Fields Settings

- **Fields Alignment**: Choose whether form fields should be left-aligned or centered
- **Fields Font Size**: Select the font size for form fields (small, medium, or large)

### Screens Settings

- **Screens Alignment**: Choose the alignment for welcome and thank you screens
- **Screens Font Size**: Select the font size for welcome and thank you screens

### Background Settings (Optional)

- **Background Image URL**: Enter a URL for a background image (optional)
- **Background Layout**: Choose how the background image should be displayed
- **Background Brightness**: Adjust the brightness of the background, from -1 (darkest) to 1 (brightest)

### Output

- **Output Variable**: Name of the variable where the updated theme information will be stored

## Example Response

The connector will return the complete updated theme information, including:

```json
{
  "background": {
    "brightness": -0.5,
    "href": "https://example.com/image.jpg",
    "layout": "fullscreen"
  },
  "colors": {
    "answer": "#4FB0AE",
    "background": "#FFFFFF",
    "button": "#4FB0AE",
    "question": "#3D3D3D"
  },
  "fields": {
    "alignment": "left",
    "font_size": "medium"
  },
  "font": "Source Sans Pro",
  "has_transparent_button": false,
  "id": "abc123",
  "name": "My Custom Theme",
  "rounded_corners": "small",
  "screens": {
    "alignment": "center",
    "font_size": "small"
  },
  "visibility": "private"
}
```