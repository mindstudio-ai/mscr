# List Pipelines

This connector retrieves all existing pipelines from your ActiveCampaign account. Pipelines in ActiveCampaign (also called "Deal Groups") organize your deals into different sales processes.

## Configuration

### Filter Options

- **Filter by Title**: Optionally enter text to filter pipelines by title. The filter will match any pipeline titles that contain the text you enter. For example, entering "Contact" would match pipelines named "In Contact", "To Contact", and "Contact Pipeline".

- **Only Show Pipelines with Stages**: Choose whether to filter pipelines based on whether they have stages:
  - **No Filter**: Show all pipelines
  - **Yes**: Only show pipelines that have at least one stage
  - **No**: Only show pipelines that don't have any stages

### Sorting Options

- **Sort by Title**: Choose how to sort the pipelines by their title:
  - **No Sorting**: Don't sort by title
  - **Ascending (A-Z)**: Sort alphabetically from A to Z
  - **Descending (Z-A)**: Sort alphabetically from Z to A

- **Sort by Popularity**: Choose how to sort the pipelines by the number of deals they have:
  - **No Sorting**: Don't sort by popularity
  - **Ascending (Least to Most)**: Show pipelines with fewer deals first
  - **Descending (Most to Least)**: Show pipelines with more deals first

### Output

- **Output Variable**: Enter a name for the variable that will store the list of pipelines. This variable will contain an array of pipeline objects, including their associated stages.

## Example Output

The output will be an array of pipeline objects, each containing information such as:

```json
{
  "dealGroups": [
    {
      "id": "1",
      "title": "Pipeline A",
      "currency": "usd",
      "stages": ["1", "2"],
      "cdate": "2017-01-16T14:51:57-06:00",
      "udate": "2017-03-01T11:06:32-06:00"
    }
  ],
  "dealStages": [
    {
      "id": "1",
      "title": "Stage 1",
      "group": "1",
      "order": "1",
      "color": "C481DF"
    },
    {
      "id": "2",
      "title": "Stage 2",
      "group": "1",
      "order": "2",
      "color": "00ECC5"
    }
  ]
}
```