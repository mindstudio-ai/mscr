# List Automation Journeys

This connector retrieves a list of automation journeys that have occurred within a specific automation in your Beehiiv account.

## What You'll Need

- Your Beehiiv publication ID (starts with `pub_`)
- The automation ID (starts with `aut_`) for which you want to retrieve journeys

## Configuration

### Publication Information

- **Publication ID**: Enter your Beehiiv publication ID (e.g., `pub_00000000-0000-0000-0000-000000000000`). You can find this in your Beehiiv dashboard.

### Automation Information

- **Automation ID**: Enter the ID of the specific automation you want to retrieve journeys for (e.g., `aut_00000000-0000-0000-0000-000000000000`).

### Pagination Options

- **Page**: The page number to retrieve (defaults to 1).
- **Results Per Page**: Number of results to return per page (defaults to 10, maximum allowed by Beehiiv API).

### Output

- **Output Variable**: Name the variable where you want to store the results. This will contain the full response with journey data and pagination information.

## Output Format

The connector returns a JSON object with the following structure:

```json
{
  "data": [
    {
      "id": "aj_00000000-0000-0000-0000-000000000000",
      "automation_id": "aut_00000000-0000-0000-0000-000000000000",
      "status": "initiated",
      "subscription_id": "sub_00000000-0000-0000-0000-000000000000",
      "email": "test@example.com",
      "started_at": 1714857600,
      "completed_at": 1714861200
    }
  ],
  "limit": 10,
  "page": 1,
  "total_results": 1,
  "total_pages": 1
}
```