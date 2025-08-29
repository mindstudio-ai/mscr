# Create Theme

This connector creates a new theme in Typeform to customize the visual appearance of your forms.

## What This Connector Does

The Create Theme connector allows you to:
- Create a new theme with custom colors, fonts, and layout settings
- Customize the appearance of questions, answers, buttons, and backgrounds
- Configure font sizes and alignments for form fields and screens
- Set button styles and corner roundness

## Configuration

### Theme Information
- **Theme Name**: Enter a descriptive name for your theme (e.g., "Brand Theme 2024")

### Colors
All colors must be provided as hexadecimal values:
- **Answer Color**: Color for answers (e.g., `#4FB0AE`)
- **Background Color**: Color for the form background (e.g., `#FFFFFF`)
- **Button Color**: Color for buttons (e.g., `#4FB0AE`)
- **Question Color**: Color for questions (e.g., `#3D3D3D`)

### Font & Layout
- **Font**: Select a font family for your theme
- **Field Alignment**: Choose whether form fields should be left-aligned or centered
- **Field Font Size**: Select the size of text in form fields (small, medium, or large)

### Screen Settings
- **Screen Alignment**: Choose alignment for welcome and thank you screens
- **Screen Font Size**: Select font size for welcome and thank you screens

### Button Style
- **Transparent Button**: Choose whether buttons should be transparent
- **Rounded Corners**: Select the level of corner roundness for buttons and elements

### Output
- **Output Variable**: The variable where the created theme information will be stored

## Example Response

The output variable will contain the created theme information in this format:

```json
{
  "background": {
    "brightness": 0,
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
  "name": "My Theme",
  "rounded_corners": "small",
  "screens": {
    "alignment": "center",
    "font_size": "small"
  },
  "visibility": "private"
}
```

## Notes
- The created theme will be private and only available in your Typeform account
- You can use this theme when creating new forms or apply it to existing forms