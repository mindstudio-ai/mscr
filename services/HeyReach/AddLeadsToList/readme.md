# Add Leads to List

This connector adds leads to a HeyReach list and returns information about how many leads were added, updated, or failed to be added.

## Configuration

### List Configuration
- **List ID**: Enter the numeric ID of the HeyReach list where you want to add leads. You can find this in your HeyReach account.

### Lead Information
- **First Name**: The lead's first name (required)
- **Last Name**: The lead's last name (required)
- **Email Address**: The lead's email address
- **LinkedIn Profile URL**: The full URL to the lead's LinkedIn profile (e.g., `https://www.linkedin.com/in/johndoe`)
- **Company Name**: The company where the lead works
- **Position**: The lead's job title or position
- **Location**: The lead's geographic location
- **Summary**: A brief summary or headline from the lead's profile
- **About**: Detailed description or about section for the lead

### Custom Fields (Optional)
- **Custom Fields**: Add custom fields in JSON format. Each field must have a 'name' and 'value'. 
  - Names must contain only alphanumeric characters or underscores
  - Example:
    ```json
    [
      {"name":"favorite_color","value":"blue"},
      {"name":"industry","value":"technology"},
      {"name":"lead_source","value":"conference"}
    ]
    ```

### Output Configuration
- **Output Variable**: Name of the variable where the response will be stored. The response will include counts of added, updated, and failed leads.

## Response Example

```json
{
  "addedLeadsCount": 1,
  "updatedLeadsCount": 0,
  "failedLeadsCount": 0
}
```

## Notes
- You can add up to 100 leads per request
- Adding leads to a list is not the same as adding them to a campaign