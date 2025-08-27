# Delete Pipeline

This action deletes an existing pipeline in ActiveCampaign along with all its associated stages and deals.

## When to use this action

Use this action when you need to:
- Remove a pipeline that is no longer needed
- Clean up your ActiveCampaign workspace
- Restructure your sales process by removing old pipelines

## Requirements

- You must have the necessary permissions in ActiveCampaign:
  - Deal permission to manage deals
  - Pipeline-specific permission to manage the pipeline
  - Pipeline delete permission to delete pipelines

## Configuration

### Pipeline ID
Enter the numeric ID of the pipeline you want to delete. You can find the pipeline ID in ActiveCampaign by:
1. Going to Settings > Deals > Manage Pipelines
2. Looking at the URL when you edit a pipeline - the ID will be in the URL

Example: `42`

### Confirm Deletion
This is a safety measure to prevent accidental deletions. You must select "Yes, I understand this will delete the pipeline" to proceed with the deletion.

## Important Notes

- This action will permanently delete the pipeline
- All stages and deals associated with the pipeline will also be deleted
- This action cannot be undone