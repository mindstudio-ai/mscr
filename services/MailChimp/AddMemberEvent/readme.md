# Add Member Event for MailChimp

This connector allows you to add custom events for a specific subscriber in your MailChimp list. These events can be used to trigger automations or segment your audience based on user behavior.

## Configuration

### List Information

- **List ID**: Enter the unique identifier for your MailChimp list (also called an audience). You can find this in your MailChimp account under Audience settings.
- **Subscriber Email or ID**: Enter either the subscriber's email address (e.g., `user@example.com`) or their contact ID from MailChimp.

### Event Details

- **Event Name**: A descriptive name for the event (e.g., `purchased`, `visited_page`, `watched_video`). Must be between 2-30 characters.
- **Event Properties (JSON)**: Optional. Add properties to provide more context about the event in JSON format:
  ```json
  {
    "product": "Premium Plan",
    "price": "99.99",
    "category": "Subscription"
  }
  ```
- **Event Time**: Optional. When the event occurred in ISO 8601 format (e.g., `2023-09-15T14:30:00Z`). If left blank, the current time will be used.
- **Prevent Automation Triggers**: Choose whether this event should trigger automations in MailChimp.
  - Select "Yes" to prevent automations from being triggered
  - Select "No" to allow automations to be triggered (default)

### Output

- **Output Variable**: Name of the variable that will store the result of this operation.

## Example Use Cases

- Track product purchases
- Record page visits
- Log video views
- Track form submissions
- Record email clicks from external sources

## Notes

- Events must comply with MailChimp's terms of service
- The subscriber must already exist in your list for the event to be recorded
- Event names should be consistent to enable effective segmentation