# List Custom Fields

This action retrieves a list of custom fields for a specified beehiiv publication.

## Configuration

### Publication Details

- **Publication ID**: Enter your beehiiv publication ID, which starts with `pub_`. You can find this in your beehiiv dashboard URL or in the publication settings.
  - Example: `pub_12345abcde67890fghij`

### Pagination Options

- **Page**: The page number to retrieve. Defaults to 1 if not specified.
- **Results Per Page**: Number of results to return per page. Defaults to 10 if not specified.

## Output

The action returns a JSON object containing:

- `data`: Array of custom field objects with:
  - `id`: Unique identifier for the custom field
  - `kind`: Type of the custom field (e.g., "string")
  - `display`: Display name of the custom field
  - `created`: Timestamp when the field was created
- `limit`: Number of results per page
- `page`: Current page number
- `total_results`: Total number of custom fields
- `total_pages`: Total number of pages available

## Example Response

```json
{
  "data": [
    {
      "id": "00000000-0000-0000-0000-000000000000",
      "kind": "string",
      "display": "First Name",
      "created": 1672531200
    },
    {
      "id": "11111111-1111-1111-1111-111111111111",
      "kind": "string",
      "display": "Company",
      "created": 1672531300
    }
  ],
  "limit": 10,
  "page": 1,
  "total_results": 20,
  "total_pages": 2
}
```