# Recalculate Segment

This action recalculates a specific segment belonging to a publication in beehiiv. Recalculating a segment refreshes the subscribers included in that segment based on the segment's criteria.

## When to use this action

Use this action when you need to:
- Update a segment after subscriber data has changed
- Ensure a segment contains the most up-to-date list of subscribers
- Refresh segment data before sending targeted campaigns

## Required inputs

### Publication ID
Enter the ID of your beehiiv publication. This ID always starts with `pub_` followed by a UUID.

Example: `pub_12345678-1234-1234-1234-123456789012`

### Segment ID
Enter the ID of the segment you want to recalculate. This ID always starts with `seg_` followed by a UUID.

Example: `seg_12345678-1234-1234-1234-123456789012`

### Output Variable
Enter a name for the variable that will store the result of this operation. You can reference this variable in subsequent steps of your workflow.

## Where to find the IDs

You can find your Publication ID and Segment ID:
1. In the beehiiv dashboard
2. By using the beehiiv API to list your publications and segments
3. From the URL when viewing a segment in the beehiiv interface

## What happens after recalculation

When a segment is recalculated, beehiiv processes all subscribers against the segment's criteria to determine which subscribers should be included in the segment. This process happens asynchronously and may take some time to complete depending on the number of subscribers.