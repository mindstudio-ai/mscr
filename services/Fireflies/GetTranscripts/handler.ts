import axios from 'axios';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { apiKey } = process.env;

  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Fireflies.ai API key in the connector settings.',
    );
  }

  // Extract inputs with defaults where appropriate
  const {
    keyword,
    scope = 'title',
    fromDate,
    toDate,
    hostEmail,
    participantEmail,
    userId,
    mine,
    limit = '10',
    skip = '0',
    includeDetails = 'true',
    includeSentences = 'false',
    includeSummary = 'false',
    includeAnalytics = 'false',
    outputVariable,
  } = inputs;

  // Convert string boolean values to actual booleans for GraphQL variables
  const mineBoolean = mine === 'true';
  const limitNumber = parseInt(limit, 10);
  const skipNumber = parseInt(skip, 10);

  // Validate limit
  if (limitNumber > 50) {
    log('Warning: Maximum limit is 50. Using 50 as the limit.');
  }

  // Build GraphQL query variables
  const variables: Record<string, any> = {};

  if (keyword) {
    variables.keyword = keyword;
  }
  if (scope) {
    variables.scope = scope.toUpperCase();
  }
  if (fromDate) {
    variables.fromDate = fromDate;
  }
  if (toDate) {
    variables.toDate = toDate;
  }
  if (hostEmail) {
    variables.hostEmail = hostEmail;
  }
  if (participantEmail) {
    variables.participantEmail = participantEmail;
  }
  if (userId) {
    variables.userId = userId;
  }
  if (mine) {
    variables.mine = mineBoolean;
  }
  if (limit) {
    variables.limit = Math.min(limitNumber, 50);
  }
  if (skip) {
    variables.skip = skipNumber;
  }

  // Build the GraphQL query dynamically based on what fields to include
  let query = `
    query Transcripts(
      $keyword: String
      $scope: TranscriptsQueryScope
      $fromDate: DateTime
      $toDate: DateTime
      $hostEmail: String
      $participantEmail: String
      $userId: String
      $mine: Boolean
      $limit: Int
      $skip: Int
    ) {
      transcripts(
        keyword: $keyword
        scope: $scope
        fromDate: $fromDate
        toDate: $toDate
        host_email: $hostEmail
        participant_email: $participantEmail
        user_id: $userId
        mine: $mine
        limit: $limit
        skip: $skip
      ) {
  `;

  // Always include ID
  query += 'id\n';

  // Include basic transcript details if requested
  if (includeDetails === 'true') {
    query += `
        title
        date
        duration
        transcript_url
        audio_url
        video_url
        meeting_link
        calendar_type
        host_email
        organizer_email
        participants
        meeting_attendees {
          displayName
          email
          name
        }
        speakers {
          id
          name
        }
        meeting_info {
          fred_joined
          silent_meeting
          summary_status
        }
    `;
  }

  // Include sentences if requested
  if (includeSentences === 'true') {
    query += `
        sentences {
          index
          speaker_name
          speaker_id
          text
          start_time
          end_time
          ai_filters {
            task
            question
            date_and_time
            sentiment
          }
        }
    `;
  }

  // Include summary if requested
  if (includeSummary === 'true') {
    query += `
        summary {
          keywords
          action_items
          outline
          overview
          short_summary
          meeting_type
          topics_discussed
        }
    `;
  }

  // Include analytics if requested
  if (includeAnalytics === 'true') {
    query += `
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
    `;
  }

  // Close the query
  query += `
      }
    }
  `;

  log('Fetching transcripts from Fireflies.ai...');

  try {
    // Make the GraphQL request
    const response = await axios.post(
      'https://api.fireflies.ai/graphql',
      {
        query,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    // Check for GraphQL errors
    if (response.data.errors) {
      const errorMessage = response.data.errors
        .map((e: any) => e.message)
        .join(', ');
      throw new Error(`GraphQL Error: ${errorMessage}`);
    }

    // Extract the transcripts from the response
    const transcripts = response.data.data.transcripts;

    log(`Successfully retrieved ${transcripts.length} transcript(s).`);

    // Set the output variable with the results
    setOutput(outputVariable, transcripts);
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const message = error.response.data?.message || error.message;

      if (status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else {
        throw new Error(`API Error (${status}): ${message}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        'No response received from Fireflies.ai. Please check your internet connection.',
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error: ${error.message}`);
    }
  }
};
