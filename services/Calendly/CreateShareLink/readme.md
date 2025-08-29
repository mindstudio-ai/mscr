# Create Share Link for Calendly

This connector creates a customized sharing link for a Calendly event type that you can use to schedule meetings.

## Configuration

### Event Type Link
Enter the full URL of your Calendly event type. This is the link that you would normally share with someone to book time on your calendar.

**Example:** `https://calendly.com/johndoe/30min`

### Max Event Count
Optionally specify the maximum number of events that can be scheduled using this share link. This is useful for limiting how many times a link can be used.

- Leave empty for unlimited bookings
- Enter a positive number (e.g., `5`) to limit the number of bookings

### Output Variable
Specify a variable name to store the generated share link. You can use this variable in subsequent steps of your workflow.

## How It Works

1. The connector extracts the event type UUID from your Calendly event link
2. It creates a new share link with your specified parameters
3. The generated share link is stored in your specified output variable

## Example Use Cases

- Create limited-use booking links for specific clients
- Generate tracking links for marketing campaigns
- Create temporary booking links for special events