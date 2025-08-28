# List Segments

This connector allows you to retrieve a list of segments from your beehiiv publication.

## What are segments?

Segments in beehiiv are groups of subscribers that match specific criteria. They can be:
- **Dynamic**: Automatically updated based on rules
- **Static**: Fixed groups of subscribers
- **Manual**: Manually created and managed

## Configuration

### Publication Settings

- **Publication ID**: Enter your beehiiv publication ID, which starts with `pub_`. You can find this in your beehiiv dashboard URL or in your publication settings.

### Filter Options

- **Segment Type**: Filter segments by their type (dynamic, static, or manual)
- **Segment Status**: Filter segments by their calculation status (pending, processing, completed, or failed)

### Pagination

- **Results Per Page**: Number of segments to return per page (1-100)
- **Page Number**: The page number to retrieve

### Sorting

- **Sort By**: Choose to sort by creation date or when the segment was last calculated
- **Sort Direction**: Sort in ascending or descending order

### Output

- **Include Segment Statistics**: Set to "Yes" to include detailed statistics for each segment (open rates, click rates, etc.)
- **Output Variable**: Name of the variable where the results will be stored

## Example Response

When the connector runs successfully, it will return data in this format:

```json
{
  "data": [
    {
      "id": "seg_00000000-0000-0000-0000-000000000000",
      "name": "Active Readers",
      "type": "dynamic",
      "total_results": 15,
      "status": "completed",
      "active": true,
      "last_calculated": 1666800076,
      "stats": {
        "open_rate": 0.5,
        "total_sent": 100,
        "clickthrough_rate": 0.5,
        "total_subscribers": 100
        // Additional stats when "Include Segment Statistics" is enabled
      }
    }
    // More segments...
  ],
  "limit": 10,
  "page": 1,
  "total_results": 25,
  "total_pages": 3
}
```