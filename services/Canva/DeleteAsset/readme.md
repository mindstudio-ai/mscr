# Delete Asset from Canva

This connector allows you to delete an asset from your Canva projects. When you delete an asset, it moves to the trash but doesn't get removed from designs that already use it.

## Prerequisites

- You need a Canva account with the appropriate permissions
- Your MindStudio integration must be authorized with Canva with the `asset:write` scope
- You need to know the Asset ID of the item you want to delete

## Configuration

### Asset ID

Enter the unique identifier of the asset you want to delete. You can find the Asset ID from the Canva API when listing assets or when you've previously created or uploaded assets.

Example Asset ID: `01FX2TWVS9AJCQHAGN4XKXYZVS`

## Important Notes

- This action is permanent but moves the asset to trash (similar to deleting in the Canva UI)
- Deleting an asset doesn't remove it from designs that already use it
- This operation is rate limited to 30 requests per minute per user
- The connector will return a success message when the asset is successfully deleted

## Troubleshooting

If you encounter errors:
- Verify the Asset ID is correct
- Ensure your Canva integration has the proper `asset:write` permission
- Check that the asset exists and belongs to the authenticated user