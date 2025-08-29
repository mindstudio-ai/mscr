# Create Single-Use Scheduling Link

This connector creates a single-use scheduling link in Calendly that can only be used once, making it ideal for one-time appointments or meetings.

## Configuration

### Event Details

- **Event Type URL**: Enter the full URL of your Calendly event type. This is the URL you would normally share with someone to book time with you.
  - Example: `https://calendly.com/yourname/30min`
  - You can find this by going to your Calendly dashboard, selecting an event type, and copying the link.

- **Max Event Count**: The maximum number of times this link can be used. 
  - Default is `1` for a true single-use link
  - You can set a higher number if you want to allow multiple bookings

- **Owner Email** (optional): The email address of the Calendly user who owns this event type.
  - Only needed if you're creating a link for someone else's calendar
  - Leave blank to use the authenticated user's calendar

### Link Options

- **Link Expiration** (optional): Number of days until this link expires.
  - Leave empty for no expiration
  - Example: `30` for a link that expires in 30 days

### Output

- **Output Variable**: The name of the variable where the single-use scheduling link will be stored.
  - This variable will contain the URL that you can share with someone to book a meeting

## How It Works

When this connector runs, it:
1. Creates a single-use scheduling link for the specified event type
2. Returns the unique booking URL that can only be used once
3. Stores this URL in your specified output variable

## Common Use Cases

- Sending personalized booking links to prospects
- Creating one-time consultation slots
- Generating unique meeting links for specific clients
- Automating appointment scheduling in your workflows