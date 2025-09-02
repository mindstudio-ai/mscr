# Gamma Presentation Generator

This connector creates presentations, documents, or social media content using Gamma's AI generation capabilities.

## Basic Usage

1. Enter your **Input Text** - This can be a brief topic or detailed content with structure
2. Choose the **Format** (presentation, document, or social media)
3. Select a **Theme** for visual styling
4. Specify an **Output Variable** to store the URL of your generated content

## Content Structure Options

- **Text Mode** determines how your input is processed:
  - **Generate**: Expands brief input into full content
  - **Condense**: Summarizes lengthy input
  - **Preserve**: Keeps your text exactly as entered

- **Card Split** controls how content is divided:
  - **Auto**: Splits based on your specified number of cards
  - **Input Text Breaks**: Uses `---` in your text as dividers between cards

### Example with Text Breaks

```
# First Card Title
Content for first card
---
# Second Card Title
Content for second card
---
# Third Card Title
Content for third card
```

## Customization Tips

- **Additional Instructions** can guide the AI (e.g., "Make titles catchy" or "Focus on data visualization")
- **Text Amount** controls verbosity (brief to extensive)
- **Tone** and **Audience** help tailor content (e.g., "professional, inspiring" for "marketing executives")

## Image Options

When using **AI Generated** images:
- Choose an **AI Image Model** (Flux or Imagen)
- Specify an **Image Style** like "photorealistic", "minimal, black and white", or "3D rendered"

## Export Options

Choose between PDF or PowerPoint (PPTX) format for your final output.