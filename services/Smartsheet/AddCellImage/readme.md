# Add Cell Image

Adds an uploaded image to a specific cell.

## Configuration
- **Sheet ID**: Sheet containing the cell
- **Row ID**: Row containing the cell
- **Column ID**: Column of the cell
- **Image ID**: ID from Upload Cell Image connector
- **Output Variable**: Variable to store result

## Workflow
1. Use "Upload Cell Image" to upload image
2. Get imageId from upload response
3. Use this connector to add image to cell

## Notes
- Requires editor access
- Cell must be IMAGE type column

