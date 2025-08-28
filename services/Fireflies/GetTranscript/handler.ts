import axios from 'axios';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Fireflies.ai API key in the connector settings.',
    );
  }

  const { transcriptId, fields, outputVariable } = inputs;

  if (!transcriptId) {
    throw new Error(
      'Missing Transcript ID. Please provide a valid transcript ID.',
    );
  }

  // Log the start of the operation
  log(`Retrieving transcript data for ID: ${transcriptId}`);

  // Define GraphQL queries based on the selected fields option
  const queries = {
    basic: `
      query Transcript($transcriptId: String!) {
        transcript(id: $transcriptId) {
          id
          title
          dateString
          date
          duration
          transcript_url
          audio_url
        }
      }
    `,
    standard: `
      query Transcript($transcriptId: String!) {
        transcript(id: $transcriptId) {
          id
          title
          dateString
          date
          duration
          transcript_url
          audio_url
          speakers {
            id
            name
          }
          sentences {
            index
            speaker_name
            speaker_id
            text
            start_time
            end_time
          }
          summary {
            keywords
            action_items
            overview
          }
        }
      }
    `,
    complete: `
      query Transcript($transcriptId: String!) {
        transcript(id: $transcriptId) {
          id
          dateString
          privacy
          analytics {
            sentiments {
              negative_pct
              neutral_pct
              positive_pct
            }
            categories {
              questions
              date_times
              metrics
              tasks
            }
            speakers {
              speaker_id
              name
              duration
              word_count
              longest_monologue
              monologues_count
              filler_words
              questions
              duration_pct
              words_per_minute
            }
          }
          speakers {
            id
            name
          }
          sentences {
            index
            speaker_name
            speaker_id
            text
            raw_text
            start_time
            end_time
            ai_filters {
              task
              pricing
              metric
              question
              date_and_time
              text_cleanup
              sentiment
            }
          }
          title
          host_email
          organizer_email
          calendar_id
          user {
            user_id
            email
            name
            num_transcripts
            recent_meeting
            minutes_consumed
            is_admin
            integrations
          }
          fireflies_users
          participants
          date
          transcript_url
          audio_url
          video_url
          duration
          meeting_attendees {
            displayName
            email
            phoneNumber
            name
            location
          }
          summary {
            keywords
            action_items
            outline
            shorthand_bullet
            overview
            bullet_gist
            gist
            short_summary
            short_overview
            meeting_type
            topics_discussed
            transcript_chapters
          }
          cal_id
          calendar_type
          meeting_info {
            fred_joined
            silent_meeting
            summary_status
          }
          apps_preview {
            outputs {
              transcript_id
              user_id
              app_id
              created_at
              title
              prompt
              response
            }
          }
          meeting_link
        }
      }
    `,
  };

  // Select the appropriate query based on the fields input
  const query = queries[fields] || queries.basic;

  try {
    // Make the GraphQL request to Fireflies.ai API
    log('Sending request to Fireflies.ai API...');

    const response = await axios.post(
      'https://api.fireflies.ai/graphql',
      {
        query,
        variables: { transcriptId },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    // Check for errors in the GraphQL response
    if (response.data.errors) {
      const errorMessage =
        response.data.errors[0]?.message || 'Unknown GraphQL error';
      log(`Error retrieving transcript: ${errorMessage}`);
      throw new Error(`Fireflies.ai API error: ${errorMessage}`);
    }

    // Extract the transcript data from the response
    const transcriptData = response.data.data.transcript;

    if (!transcriptData) {
      throw new Error(
        'Transcript not found. Please check the transcript ID and try again.',
      );
    }

    log(
      `Successfully retrieved transcript: "${transcriptData.title || 'Untitled'}"`,
    );

    // Set the output variable with the transcript data
    setOutput(outputVariable, transcriptData);
  } catch (error) {
    // Handle different types of errors
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code outside of 2xx range
        const status = error.response.status;
        if (status === 401 || status === 403) {
          throw new Error('Authentication failed. Please check your API key.');
        } else if (status === 404) {
          throw new Error(
            'Transcript not found. Please check the transcript ID.',
          );
        } else {
          throw new Error(
            `API request failed with status ${status}: ${error.message}`,
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error(
          'No response received from Fireflies.ai. Please check your internet connection and try again.',
        );
      }
    }

    // For other types of errors
    throw error;
  }
};
