# Get Segment

This connector retrieves detailed information about a specific segment from your beehiiv publication.

## Configuration

### Publication ID
Enter the ID of your beehiiv publication. This ID starts with `pub_` followed by a UUID.

Example: `pub_00000000-0000-0000-0000-000000000000`

You can find your publication ID in the URL when viewing your publication in the beehiiv dashboard or via the beehiiv API.

### Segment ID
Enter the ID of the segment you want to retrieve information about. This ID starts with `seg_` followed by a UUID.

Example: `seg_00000000-0000-0000-0000-000000000000`

You can find segment IDs in the beehiiv dashboard under Audience → Segments, or via the beehiiv API.

### Include Statistics
Choose whether to include detailed statistics about the segment in the response:

- **Yes**: Includes statistics like open rates, subscriber counts, and engagement metrics
- **No**: Returns only basic segment information without statistics

### Output Variable
Enter a name for the variable that will store the segment information. You can reference this variable in subsequent steps of your workflow.

## Response Data

The connector returns a segment object containing:

- **id**: The segment's unique identifier
- **name**: The name of the segment
- **type**: The type of segment (dynamic, static, manual, all)
- **total_results**: Number of subscribers in the segment
- **status**: Current calculation status (pending, processing, completed, failed)
- **active**: Whether the segment is active
- **last_calculated**: When the segment was last calculated (Unix timestamp)
- **stats**: (If requested) Statistics about the segment including open rates, subscriber counts, etc.