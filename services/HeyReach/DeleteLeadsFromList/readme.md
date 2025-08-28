# Delete Leads From List

This connector allows you to remove leads from a HeyReach list by providing their LinkedIn profile URLs.

## Configuration

### List Configuration

- **List ID**: Enter the ID number of the HeyReach list from which you want to delete leads. This is a numeric value (e.g., `1234`) that you can find in your HeyReach dashboard when viewing your lists.

### Leads to Delete

- **LinkedIn Profile URLs**: Enter the full LinkedIn profile URLs of the leads you want to delete from the list, with one URL per line. For example:
  ```
  https://www.linkedin.com/in/john-doe/
  https://www.linkedin.com/in/jane-doe/
  https://www.linkedin.com/in/another-person/
  ```

### Output Configuration

- **Output Variable**: Specify a variable name to store information about leads that were not found in the list. This will contain an array of usernames (not full URLs) that couldn't be deleted because they weren't in the list.

## How It Works

The connector will:
1. Take the List ID you provide
2. Process the LinkedIn profile URLs you entered
3. Send a request to HeyReach to delete these leads from your list
4. Return information about any leads that couldn't be found in the list

## Note

- The connector will return a successful response even if some leads are not found in the list.
- Leads not found in the list will be returned in the output variable as usernames (e.g., "john-doe") rather than full URLs.