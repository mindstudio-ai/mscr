# Export Design from Canva

This connector allows you to export a Canva design in various formats (PDF, JPG, PNG, GIF, PowerPoint, or MP4).

## Requirements
- A Canva Connect API access token
- The Design ID of the Canva design you want to export

## How to Use

### Design Information
- **Design ID**: Enter the ID of your Canva design. This is typically found in the URL of your design (e.g., if your design URL is `https://www.canva.com/design/DAVZr1z5464/xxx`, the Design ID is `DAVZr1z5464`).

### Export Format
- **Format Type**: Choose the format you want to export your design in (PDF, JPG, PNG, GIF, PowerPoint, or MP4).
- **Export Quality**: Choose between Regular or Premium quality. Note that Premium quality requires a Canva Pro subscription if your design contains premium elements.

### Format-Specific Options
Depending on the format you choose, different options will be relevant:

#### For PDF exports:
- **PDF Size**: Choose the paper size (A4, A3, Letter, or Legal). This is only applicable for Document designs.

#### For JPG exports:
- **JPG Quality**: Enter a value between 1-100. Higher values mean better quality but larger file sizes.

#### For image exports (JPG, PNG, GIF):
- **Width/Height**: Optionally specify dimensions in pixels (40-25000). If you specify only one dimension, the aspect ratio will be maintained.

#### For PNG exports:
- **PNG Options**: Choose between Default or Transparent Background (requires Canva Pro).

#### For MP4 exports:
- **Video Quality**: Select the orientation and resolution for your video export.

### Page Selection
- **Pages to Export**: Optionally enter specific page numbers as a comma-separated list (e.g., `1,2,5`). Leave empty to export all pages.

### Output
- **Output Variable**: Enter a name for the variable that will store the download URL(s) for your exported design.

## Notes
- The export process is asynchronous. The connector will wait for the export to complete before returning the download URL(s).
- Download URLs are valid for 24 hours.
- Some export options (like transparent PNG backgrounds) require a Canva Pro subscription.
- If you're exporting a multi-page design, you'll receive a separate download URL for each page.