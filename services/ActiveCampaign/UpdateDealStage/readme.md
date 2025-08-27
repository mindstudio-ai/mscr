# Update Deal Stage

This connector allows you to update an existing deal stage in your ActiveCampaign account.

## Prerequisites

- You need an ActiveCampaign account with API access
- You must have the ID of the deal stage you want to update
- You need the pipeline ID that the stage belongs to
- You need appropriate permissions in ActiveCampaign:
  - Deal permission to manage deals
  - Edit Pipeline permission
  - Pipeline-specific permission to manage the pipeline

## Configuration

### Deal Stage Details

- **Deal Stage ID**: The unique identifier of the deal stage you want to update (e.g., "16")
- **Title**: The name you want to give the deal stage (e.g., "Qualifications - Low")
- **Pipeline ID**: The ID of the pipeline this stage belongs to (e.g., "4")
- **Color**: Optional hex color code for the stage (e.g., "696969" for gray)
- **Order**: Optional numeric value determining the position of the stage in the pipeline
- **Width**: Width of the stage column in pixels (default is 270)

### Card Display Configuration

These settings control how deal cards appear within this stage:

- **Card Region 1-5**: Different areas of the deal card that can display specific information
- **Deal Order**: How deals are sorted within this stage (by title or value)

### Advanced Options

- **Reorder Stages**: Choose whether to automatically reorder all stages in the pipeline after updating this stage

## Output

The connector will return the updated deal stage information, including its ID, title, and other configured properties.

## Example Use Cases

- Renaming deal stages to better reflect your sales process
- Changing the order of stages within a pipeline
- Adjusting the visual appearance of deal stages (color, width)
- Modifying how deal information is displayed on cards