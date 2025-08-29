# Create Event Type in Calendly

This connector creates a new event type in your Calendly account. Event types are the different meeting options that you offer to attendees (like "30 Min Meeting", "Discovery Call", etc.).

## Prerequisites

- You must have a Calendly account connected to MindStudio
- You need your Calendly Profile ID (see below for how to find it)

## Configuration

### Event Type Details

- **Event Type Name**: The name that will be displayed to your attendees (e.g., "Discovery Call", "30-Minute Consultation")
- **Description**: Optional details about what the meeting is for
- **Color**: Optional hex color code for the event (e.g., #0088cc for blue)
- **Duration**: Length of the meeting in minutes (e.g., 15, 30, 60)

### Scheduling Options

- **Custom URL Slug**: Optional custom part of the URL for this event type (e.g., "discovery-call")
- **Event Kind**: 
  - One-on-One: Standard 1:1 meeting
  - Group: Multiple attendees can book the same slot
  - Collective: Multiple hosts attend the same meeting
  - Round Robin: Distribute meetings among team members
- **Pooling Type**: For Round Robin events, choose how to assign hosts
- **Profile ID**: Your Calendly profile ID (required)

### Finding Your Profile ID

Your Profile ID is needed to associate the event type with your account. To find it:

1. Go to your Calendly dashboard
2. Open your browser's developer tools (F12 or right-click → Inspect)
3. Go to the Network tab
4. Refresh the page and look for requests to the Calendly API
5. Find a request that includes your profile information
6. Look for a URI like `https://api.calendly.com/profiles/XXXX` where XXXX is your profile ID

Alternatively, you can create an event type manually in Calendly, then use the Calendly API to list your event types, which will include your profile ID.

## Output

The connector will store the complete details of the created event type in your specified output variable, including the scheduling URL that you can share with attendees.