# Get Landing Page Report

This connector retrieves a detailed report for a specific Mailchimp landing page, providing metrics like visits, clicks, conversion rates, and more.

## Configuration

### Landing Page ID
Enter the unique identifier for the landing page you want to get a report for. This is a string like `00dfc2e1f0` that uniquely identifies your landing page in Mailchimp.

### Fields to Include (Optional)
A comma-separated list of specific fields you want to include in the response. This helps you get only the data you need.

**Example:** `id,name,visits,unique_visits,subscribes,clicks,conversion_rate`

Common fields include:
- `id` - The landing page ID
- `name` - The landing page name
- `visits` - Total number of visits
- `unique_visits` - Number of unique visitors
- `subscribes` - Number of subscriptions generated
- `clicks` - Number of clicks on the page
- `conversion_rate` - Percentage of visitors who subscribed
- `status` - Current status of the landing page
- `published_at` - When the page was published
- `url` - The landing page URL

### Fields to Exclude (Optional)
A comma-separated list of fields you want to exclude from the response.

**Example:** `timeseries,ecommerce`

### Output Variable
The name of the variable where the landing page report data will be stored for use in subsequent steps of your workflow.

## Authentication
This connector requires your Mailchimp API key and server prefix to be configured in the MindStudio connection settings for Mailchimp.