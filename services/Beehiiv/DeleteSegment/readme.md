# Delete Segment

This action allows you to delete a segment from a Beehiiv publication. Deleting a segment does not affect the subscriptions within the segment.

## Configuration

### Publication ID
Enter the ID of the publication that contains the segment you want to delete. The publication ID starts with `pub_` followed by a UUID.

Example: `pub_00000000-0000-0000-0000-000000000000`

### Segment ID
Enter the ID of the segment you want to delete. The segment ID starts with `seg_` followed by a UUID.

Example: `seg_00000000-0000-0000-0000-000000000000`

### Success Variable
Enter a name for the variable that will store the success status of the operation. This variable will be set to `true` if the segment was successfully deleted.

## Notes

- You need to have a valid Beehiiv API key configured in your environment variables.
- Make sure you have the correct permissions to delete segments in the specified publication.
- Once a segment is deleted, it cannot be recovered.