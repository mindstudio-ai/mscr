# Fireflies.ai Get Transcripts

This connector allows you to retrieve transcripts from your Fireflies.ai account using various search criteria.

## Prerequisites

- A Fireflies.ai account
- An API key from Fireflies.ai

## Configuration

### Query Parameters

- **Keyword Search**: Enter terms to search for in meeting titles and/or content
- **Search Scope**: Choose where to search for keywords:
  - Title Only: Search only in meeting titles
  - Sentences Only: Search only in spoken content
  - Title and Sentences: Search in both titles and content
- **From Date**: Filter transcripts created after this date (ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.sssZ`)
- **To Date**: Filter transcripts created before this date (ISO 8601 format: `YYYY-MM-DDTHH:mm:ss.sssZ`)
- **Host Email**: Filter meetings by the host's email address
- **Participant Email**: Filter meetings that include this email as an attendee
- **User ID**: Filter meetings associated with this user ID
- **My Meetings Only**: Set to "Yes" to only show meetings where you are the organizer
- **Result Limit**: Maximum number of transcripts to return (max: 50)
- **Skip Results**: Number of transcripts to skip (useful for pagination)

### Result Fields

- **Include Transcript Details**: Include basic information like title, ID, date, and duration
- **Include Sentences**: Include the actual transcript content and speaker information
- **Include Summary**: Include AI-generated summary, action items, and keywords
- **Include Analytics**: Include meeting analytics like sentiment analysis and speaker metrics

### Output

- **Output Variable**: Name of the variable where the results will be stored

## Example Usage

To find all transcripts from the last month that mention "project update":

1. Set **Keyword Search** to `project update`
2. Set **Search Scope** to `Title and Sentences`
3. Set **From Date** to the first day of last month (e.g., `2023-05-01T00:00:00.000Z`)
4. Set **To Date** to the last day of last month (e.g., `2023-05-31T23:59:59.999Z`)
5. Set **Include Summary** to `Yes` to get action items and key points
6. Set **Output Variable** to `transcripts`

## Response Format

The connector returns a JSON object containing an array of transcript objects with the requested fields. The exact structure depends on which result fields you selected.