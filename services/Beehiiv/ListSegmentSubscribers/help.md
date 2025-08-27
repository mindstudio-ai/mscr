# List Segment Subscribers

This connector retrieves a list of subscriber IDs from a specific segment in your Beehiiv publication.

## Configuration

### Publication ID
Enter your Beehiiv publication ID, which starts with `pub_`. You can find this in your Beehiiv dashboard.

Example: `pub_00000000-0000-0000-0000-000000000000`

### Segment ID
Enter the ID of the segment you want to retrieve subscribers from. This starts with `seg_`.

Example: `seg_00000000-0000-0000-0000-000000000000`

## Pagination Options

### Results Per Page
Specify how many subscriber IDs to return per page (between 1 and 100). If left blank, the default is 10.

### Page Number
Specify which page of results to retrieve. If left blank, the default is page 1.

## Output

The connector will return an object containing:
- `data`: An array of subscriber IDs
- `limit`: The number of results per page
- `page`: The current page number
- `total_results`: Total number of subscribers in the segment
- `total_pages`: Total number of pages available

Example output:
```json
{
  "data": [
    "sub_00000000-0000-0000-0000-000000000000",
    "sub_11111111-1111-1111-1111-111111111111"
  ],
  "limit": 10,
  "page": 1,
  "total_results": 25,
  "total_pages": 3
}
```