# Get Campaign Click Details

This connector retrieves detailed information about clicks on specific links in your Mailchimp campaign. You can use this data to understand which links in your campaign are performing best and how users are interacting with your content.

## Configuration

### Campaign ID
Enter the unique identifier for your Mailchimp campaign. You can find this ID in your Mailchimp account or in the URL when viewing a campaign.

Example: `abc123def456`

### Results Count
Specify how many link results you want to retrieve. The default is 10, but you can set it up to a maximum of 1000.

### Sort By
Choose how you want the results sorted:
- **Total Clicks**: Sort by the total number of clicks on each link
- **Unique Clicks**: Sort by the number of unique users who clicked each link

### Sort Direction
Determine the order of sorted results:
- **Ascending**: Lowest to highest (A-Z)
- **Descending**: Highest to lowest (Z-A)

### Output Variable
Enter a name for the variable that will store the campaign click details. You can reference this variable in subsequent steps of your workflow.

## Output Data

The connector returns comprehensive data about link clicks in your campaign, including:

- A list of URLs that were clicked
- Total clicks for each URL
- Unique clicks for each URL
- Click percentages
- Timestamps of the last clicks
- A/B testing data (if applicable)