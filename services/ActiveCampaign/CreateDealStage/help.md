# Create Deal Stage in ActiveCampaign

This action creates a new deal stage in an ActiveCampaign pipeline. Deal stages represent the different phases that deals go through in your sales process.

## Required Permissions

To create a deal stage, you need:
- Deal permission: Permission to manage deals
- Edit Pipeline permission: Permission to edit pipelines
- Pipeline-specific permission: Permission to manage the specific pipeline

## Configuration

### Deal Stage Details

- **Title**: Enter a name for your deal stage (e.g., "Initial Contact", "Proposal Sent")
- **Pipeline ID**: Enter the ID of the pipeline this stage belongs to. You can find pipeline IDs in your ActiveCampaign account under Deals > Manage Pipelines.
- **Stage Order** (optional): A numeric value that determines the position of this stage in the pipeline. Lower numbers appear first.
- **Stage Color** (optional): The color of the stage in hex format without the # symbol (e.g., "32B0FC" for blue)
- **Stage Width** (optional): The width of the stage in pixels (default: 280)

### Card Display Settings

These settings control how deal cards appear within this stage:

- **Deal Order**: Choose how deals should be sorted within this stage
- **Card Regions 1-5**: Select what information to display in each region of the deal cards

### Advanced Options

- **Reorder Stages**: If set to "Yes", all stages within the pipeline will be reordered after creating this stage
- **Output Variable**: The variable where the created deal stage data will be stored

## Example Response

The output variable will contain the complete deal stage data, including its ID and other properties:

```json
{
  "dealStage": {
    "id": "123",
    "title": "Initial Contact",
    "group": "4",
    "order": 1,
    "color": "32B0FC",
    "width": 280,
    "dealOrder": "next-action DESC",
    "cardRegion1": "title",
    "cardRegion2": "next-action",
    "cardRegion3": "show-avatar",
    "cardRegion4": "contact-fullname-orgname",
    "cardRegion5": "value"
  }
}
```