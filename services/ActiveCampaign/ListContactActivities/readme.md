# List Contact Activities

This connector retrieves a list of activities for a specific contact in your ActiveCampaign account. Activities include email interactions, list subscriptions, automation steps, and more.

## Configuration

### Contact Information
- **Contact ID**: Enter the numeric ID of the contact whose activities you want to retrieve. You can find this ID in your ActiveCampaign dashboard when viewing a contact.

### Filtering Options
- **Activities After Date** (Optional): Filter to only show activities that occurred after this date and time. Use ISO format (YYYY-MM-DDTHH:MM:SS), for example: `2023-01-01T00:00:00`.
- **Sort Order** (Optional): Choose how to sort the activities by timestamp:
  - Newest First (Descending): Shows the most recent activities first
  - Oldest First (Ascending): Shows the oldest activities first
- **Include Email Data** (Optional): Choose whether to include detailed email data fields in the activities.

### Output Configuration
- **Output Variable**: Enter a name for the variable that will store the retrieved activities. You can reference this variable in subsequent steps of your workflow.

## Response Data

The connector returns a structured object containing:
- Contact details
- Activity records with timestamps, types, and actions
- Related reference data for each activity

## Example Usage

After running this connector, you can access the activities using your output variable. For example, if your output variable is named `contactActivities`, you can access:

- Basic contact info: `{{contactActivities.contacts[0].email}}`
- First activity timestamp: `{{contactActivities.activities[0].tstamp}}`
- Number of activities: `{{contactActivities.activities.length}}`