# Get Post Templates

This action retrieves a list of post templates available for a specified beehiiv publication.

## Configuration

### Publication Details

- **Publication ID**: Enter your beehiiv publication ID, which starts with `pub_`. You can find this in your beehiiv dashboard URL or in the publication settings.
  
  Example: `pub_00000000-0000-0000-0000-000000000000`

### Pagination Options (Optional)

- **Results Per Page**: Number of templates to return per page (between 1-100). Default is 10.

- **Page Number**: The page of results to retrieve. Default is 1.

- **Sort Order**: Choose whether to sort results in ascending or descending order.

### Output

- **Output Variable**: Enter a name for the variable that will store the list of post templates. You can reference this variable in subsequent steps of your workflow.

## Response Format

The action returns a JSON object containing:

```json
{
  "data": [
    {
      "id": "post_template_00000000-0000-0000-0000-000000000000",
      "name": "Newsletter Template"
    },
    {
      "id": "post_template_11111111-1111-1111-1111-111111111111",
      "name": "Blog Post Template"
    }
  ],
  "limit": 10,
  "page": 1,
  "total_results": 2,
  "total_pages": 1
}
```

## Authentication

This action requires a beehiiv API key to be configured in the beehiiv service settings.