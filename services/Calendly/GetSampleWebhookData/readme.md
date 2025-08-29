# Get Sample Webhook Data - Calendly

This connector retrieves sample webhook data from Calendly, which is useful for testing and development purposes without having to wait for actual events to occur.

## Configuration

### Webhook Configuration

- **Webhook Event**: Choose the type of webhook event you want to see sample data for:
  - **Invitee Created**: Sample data for when someone schedules an event
  - **Invitee Canceled**: Sample data for when someone cancels a scheduled event
  - **Routing Form Submission Created**: Sample data for when someone submits a routing form

### Output

- **Output Variable**: Enter a name for the variable that will store the sample webhook data. You can reference this variable in subsequent actions using the format `{{variableName}}`.

## What This Connector Does

This connector makes a request to Calendly's API to retrieve sample webhook data for the selected event type. The data is structured exactly as it would be in a real webhook payload, allowing you to test your integrations without waiting for actual events.

## Authentication

This connector uses OAuth authentication which is managed by the platform. Make sure you've connected your Calendly account in the Connections section before using this connector.

## Example Use Cases

- Testing webhook handlers during development
- Understanding the structure of Calendly webhook payloads
- Building and testing integrations that process Calendly events

## Note

This connector only provides sample data and does not create or modify any actual events in your Calendly account.