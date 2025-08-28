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
    throw new Error('Missing API Key');
  }

  const {
    startTime,
    endTime,
    analyticsLevel,
    includeTeamConversation,
    includeTeamMeeting,
    includeUserConversation,
    includeUserMeeting,
    outputVariable,
  } = inputs;

  // Build GraphQL query based on user selections
  let query = buildGraphQLQuery(
    analyticsLevel,
    includeTeamConversation,
    includeTeamMeeting,
    includeUserConversation,
    includeUserMeeting,
  );

  log(`Fetching Fireflies analytics data from ${startTime} to ${endTime}`);

  try {
    const response = await axios.post(
      'https://api.fireflies.ai/graphql',
      {
        query,
        variables: { startTime, endTime },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    if (response.data.errors) {
      const errorMessage = response.data.errors
        .map((e: any) => e.message)
        .join(', ');
      throw new Error(`GraphQL errors: ${errorMessage}`);
    }

    log('Successfully retrieved analytics data');
    setOutput(outputVariable, response.data.data.analytics);
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (status === 403) {
        throw new Error(
          'You do not have permission to access this resource. Your plan may require an upgrade.',
        );
      }

      throw new Error(`API error (${status}): ${JSON.stringify(data)}`);
    }
    throw error;
  }
};

/**
 * Builds the GraphQL query based on user selections
 */
function buildGraphQLQuery(
  analyticsLevel: string,
  includeTeamConversation: string,
  includeTeamMeeting: string,
  includeUserConversation: string,
  includeUserMeeting: string,
): string {
  let queryParts = [];

  // Include team analytics if selected
  if (analyticsLevel === 'team' || analyticsLevel === 'both') {
    let teamParts = [];

    // Add team conversation metrics
    if (includeTeamConversation !== 'none') {
      teamParts.push(`conversation {
        ${getTeamConversationFields(includeTeamConversation)}
      }`);
    }

    // Add team meeting metrics
    if (includeTeamMeeting !== 'none') {
      teamParts.push(`meeting {
        ${getTeamMeetingFields(includeTeamMeeting)}
      }`);
    }

    if (teamParts.length > 0) {
      queryParts.push(`team {
        ${teamParts.join('\n')}
      }`);
    }
  }

  // Include user analytics if selected
  if (analyticsLevel === 'users' || analyticsLevel === 'both') {
    let userParts = [];

    // Always include basic user identification fields
    userParts.push('user_id\nuser_name\nuser_email');

    // Add user conversation metrics
    if (includeUserConversation !== 'none') {
      userParts.push(`conversation {
        ${getUserConversationFields(includeUserConversation)}
      }`);
    }

    // Add user meeting metrics
    if (includeUserMeeting !== 'none') {
      userParts.push(`meeting {
        ${getUserMeetingFields(includeUserMeeting)}
      }`);
    }

    if (userParts.length > 0) {
      queryParts.push(`users {
        ${userParts.join('\n')}
      }`);
    }
  }

  return `
    query Analytics($startTime: String, $endTime: String) {
      analytics(start_time: $startTime, end_time: $endTime) {
        ${queryParts.join('\n')}
      }
    }
  `;
}

/**
 * Returns team conversation fields based on selected detail level
 */
function getTeamConversationFields(level: string): string {
  if (level === 'basic') {
    return `
      average_filler_words
      average_questions
      average_silence_duration
      average_talk_listen_ratio
      average_words_per_minute
      total_meetings_count
    `;
  } else if (level === 'all') {
    return `
      average_filler_words
      average_filler_words_diff_pct
      average_monologues_count
      average_monologues_count_diff_pct
      average_questions
      average_questions_diff_pct
      average_sentiments {
        negative_pct
        neutral_pct
        positive_pct
      }
      average_silence_duration
      average_silence_duration_diff_pct
      average_talk_listen_ratio
      average_words_per_minute
      longest_monologue_duration_sec
      longest_monologue_duration_diff_pct
      total_filler_words
      total_filler_words_diff_pct
      total_meeting_notes_count
      total_meetings_count
      total_monologues_count
      total_monologues_diff_pct
      teammates_count
      total_questions
      total_questions_diff_pct
      total_silence_duration
      total_silence_duration_diff_pct
    `;
  }
  return '';
}

/**
 * Returns team meeting fields based on selected detail level
 */
function getTeamMeetingFields(level: string): string {
  if (level === 'basic') {
    return `
      count
      duration
      average_duration
    `;
  } else if (level === 'all') {
    return `
      count
      count_diff_pct
      duration
      duration_diff_pct
      average_count
      average_count_diff_pct
      average_duration
      average_duration_diff_pct
    `;
  }
  return '';
}

/**
 * Returns user conversation fields based on selected detail level
 */
function getUserConversationFields(level: string): string {
  if (level === 'basic') {
    return `
      talk_listen_pct
      total_silence_duration
      user_filler_words
      user_monologues_count
      user_questions
      user_words_per_minute
    `;
  } else if (level === 'all') {
    return `
      talk_listen_pct
      talk_listen_ratio
      total_silence_duration
      total_silence_duration_compare_to
      total_silence_pct
      total_silence_ratio
      total_speak_duration
      total_speak_duration_with_user
      total_word_count
      user_filler_words
      user_filler_words_compare_to
      user_filler_words_diff_pct
      user_longest_monologue_sec
      user_longest_monologue_compare_to
      user_longest_monologue_diff_pct
      user_monologues_count
      user_monologues_count_compare_to
      user_monologues_count_diff_pct
      user_questions
      user_questions_compare_to
      user_questions_diff_pct
      user_speak_duration
      user_word_count
      user_words_per_minute
      user_words_per_minute_compare_to
      user_words_per_minute_diff_pct
    `;
  }
  return '';
}

/**
 * Returns user meeting fields based on selected detail level
 */
function getUserMeetingFields(level: string): string {
  if (level === 'basic') {
    return `
      count
      duration
    `;
  } else if (level === 'all') {
    return `
      count
      count_diff
      count_diff_compared_to
      count_diff_pct
      duration
      duration_diff
      duration_diff_compared_to
      duration_diff_pct
    `;
  }
  return '';
}
